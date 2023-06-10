import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb';

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
  // console.log(JSON.stringify(event));

  let wikiTableName = '';
  if (process.env.WIKI_REPO_CREATED_TABLE_NAME) {
    wikiTableName = process.env.WIKI_REPO_CREATED_TABLE_NAME;
  } else {
    return {
      statusCode: 500,
      body: '',
    };
  }

  const docClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));
  const queryInput = {
    TableName: wikiTableName,
    KeyConditionExpression: 'id = :partitionKey',
    ExpressionAttributeValues: {
      ':partitionKey': 'fixMe',
    },
  };
  const queryCommand = new QueryCommand(queryInput);
  const queryResponse = await docClient.send(queryCommand);

  if (queryResponse.Count != 1) {
    return {
      statusCode: 404,
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
  // console.log(s3Name);

  // const s3Client = new S3Client({});
  // const getObjectInput = {
  //   Bucket: s3Name,
  //   Key: 'iDontExist',
  // };
  // const getObjectCommand = new GetObjectCommand(getObjectInput);
  // const response = await s3Client.send(getObjectCommand);
  // console.log(response);

  return {
    statusCode: 200,
    body: '',
  };
};
