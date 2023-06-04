import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

import { App } from 'octokit';

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */

export const lambdaHandler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  console.log(JSON.stringify(event));

  const secretName = 'alareti-githubapp';

  const client = new SecretsManagerClient({
    region: 'us-east-2',
  });

  const secretResponse = await client.send(
    new GetSecretValueCommand({
      SecretId: secretName,
    }),
  );

  const secret = secretResponse.SecretString;
  if (!secret)
    return {
      statusCode: 500,
      body: '',
    };

  let body = '';
  let statusCode = 0;
  if (event.httpMethod === 'OPTIONS') {
    statusCode = 201;
    body = '';
  } else {
    statusCode = 200;
    const app = new App({
      appId: 339960,
      privateKey: secret,
    });

    console.log('Here I am');
    const octokit = await app.getInstallationOctokit(38017192);

    const githubResponse = await octokit.rest.repos.delete({
      owner: 'alareti',
      repo: 'b42f78a8-17da-415c-ad17-24da4eba2ea9',
    });
    body = JSON.stringify(githubResponse);
    console.log(body);
  }

  const response = {
    statusCode: statusCode,
    headers: {
      'access-control-allow-headers':
        'access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,content-type',
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'DELETE, OPTIONS',
      'content-type': 'application/json',
    },
    body: body,
  };

  try {
    return response;
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'some error happened',
      }),
    };
  }

  // if (event.body) {
  //   const bodyParsed = JSON.parse(event.body);
  //   console.log(JSON.stringify(bodyParsed));
  // }

  // try {
  //   return {
  //     statusCode: 200,
  //     body: JSON.stringify(event),
  //   };
  // } catch (err) {
  //   console.log(err);
  //   return {
  //     statusCode: 500,
  //     body: JSON.stringify({
  //       message: 'some error happened',
  //     }),
  //   };
  // }
};
