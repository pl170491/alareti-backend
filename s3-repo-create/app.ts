import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

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

  // let repoUuid = '';
  // let gitLink = '';
  if (event.body) {
    console.log(JSON.parse(event.body));
  } else {
    return {
      statusCode: 500,
      body: '',
    };
  }

  // let s3Name = '';
  // if (process.env.WIKI_ARTIFACT_BUCKET_NAME) {
  //   s3Name = process.env.WIKI_ARTIFACT_BUCKET_NAME;
  // } else {
  //   return {
  //     statusCode: 500,
  //     body: '',
  //   };
  // }

  // console.log(repoUuid);
  // console.log(JSON.stringify(process.env.WIKI_REPO_CREATED_TABLE_NAME));

  // const s3Client = new S3Client({});
  // const putInput = {
  //   Bucket: s3Name,
  //   Key: repoUuid + '/',
  //   ContentLength: 0,
  // };
  // const putCommand = new PutObjectCommand(putInput);
  // const putResponse = await s3Client.send(putCommand);
  // console.log(JSON.stringify(putResponse));

  return {
    statusCode: 200,
    body: '',
  };
};
