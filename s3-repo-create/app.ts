import { DynamoDBStreamEvent } from 'aws-lambda';
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

// Gotta learn more about types for this
function jsonHelper(object: any, target: string[]) {
  let objectArray: any[] = [];
  if (!Array.isArray(object)) {
    objectArray = [object];
  } else {
    objectArray = object;
  }

  for (const key of target) {
    objectArray = objectArray
      .map((object) => {
        if (!object[key]) {
          return undefined;
        } else {
          return object[key];
        }
      })
      .filter((object) => {
        return object != undefined;
      })
      .flat();
  }
  return objectArray;
}

export const lambdaHandler = async (event: DynamoDBStreamEvent) => {
  console.log(JSON.stringify(event));

  let s3Name = '';
  if (process.env.WIKI_ARTIFACT_BUCKET_NAME) {
    s3Name = process.env.WIKI_ARTIFACT_BUCKET_NAME;
  } else {
    return {
      statusCode: 500,
      body: '',
    };
  }

  const repoUuids = jsonHelper(event, [
    'Records',
    'dynamodb',
    'Keys',
    'id',
    'S',
  ]);

  const s3Client = new S3Client({});
  for (const repoUuid of repoUuids) {
    const putInput = {
      Bucket: s3Name,
      Key: repoUuid + '/',
      ContentLength: 0,
    };

    const putCommand = new PutObjectCommand(putInput);
    const putResponse = await s3Client.send(putCommand);
    console.log(JSON.stringify(putResponse));
  }
};
