const tester = {
  Records: [
    {
      eventID: '877f0235e55bdb5e440427f265ec4669',
      eventName: 'INSERT',
      eventVersion: '1.1',
      eventSource: 'aws:dynamodb',
      awsRegion: 'us-east-2',
      dynamodb: {
        ApproximateCreationDateTime: 1685913645,
        Keys: {
          id: {
            S: '85e7cc90-2bf7-4c44-a191-1593c35173cd',
          },
        },
        NewImage: {
          data: {
            M: {
              gitlink: {
                S: 'https://api.github.com/repos/alareti/85e7cc90-2bf7-4c44-a191-1593c35173cd',
              },
              titelink: {
                S: '',
              },
              permalink: {
                S: 'https://api.alareti.com/wiki/85e7cc90-2bf7-4c44-a191-1593c35173cd',
              },
            },
          },
          id: {
            S: '85e7cc90-2bf7-4c44-a191-1593c35173cd',
          },
        },
        SequenceNumber: '20000000000002842394934',
        SizeBytes: 248,
        StreamViewType: 'NEW_AND_OLD_IMAGES',
      },
      eventSourceARN:
        'arn:aws:dynamodb:us-east-2:412300612718:table/alareti-backend-WikiArticleCreatedTable-HLM9ZGSWZKL3/stream/2023-06-04T20:51:24.270',
    },
    {
      eventID: '877f0235e55bdb5e440427f265ec4669',
      eventName: 'INSERT',
      eventVersion: '1.1',
      eventSource: 'aws:dynamodb',
      awsRegion: 'us-east-2',
      dynamodb: {
        ApproximateCreationDateTime: 1685913645,
        Keys: {
          id: {
            S: '85e7cc90-2bf7-4c44-a191-1593c35173cd',
          },
        },
        NewImage: {
          data: {
            M: {
              gitlink: {
                S: 'https://api.github.com/repos/alareti/85e7cc90-2bf7-4c44-a191-1593c35173cd',
              },
              titelink: {
                S: '',
              },
              permalink: {
                S: 'https://api.alareti.com/wiki/85e7cc90-2bf7-4c44-a191-1593c35173cd',
              },
            },
          },
          id: {
            S: '85e7cc90-2bf7-4c44-a191-1593c35173cd',
          },
        },
        SequenceNumber: '20000000000002842394934',
        SizeBytes: 248,
        StreamViewType: 'NEW_AND_OLD_IMAGES',
      },
      eventSourceARN:
        'arn:aws:dynamodb:us-east-2:412300612718:table/alareti-backend-WikiArticleCreatedTable-HLM9ZGSWZKL3/stream/2023-06-04T20:51:24.270',
    },
  ],
};

const target = ['Records', 'dynamodb', 'Keys', 'id', 'S'];

// This is probably super buggy.
function jsonHelper(jsonObject, target) {
  let objectArray = jsonObject;

  for (const key of target) {
    console.log(key);
    console.log(Array.isArray(objectArray));
    if (!Array.isArray(objectArray)) {
      objectArray = [objectArray];
    }
    console.log(objectArray);

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

console.log(jsonHelper(tester, target));
