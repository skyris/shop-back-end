const { S3 } = require('aws-sdk');
const { createResponse } = require('./utils');
const { STATUS_CODES } = require('./utils/constants')

const { BUCKET, REGION, INPUT_FOLDER } = process.env;


async function handler(event) {
  const { name: fileName } = event.queryStringParameters;
  const inputFileKey = `${INPUT_FOLDER}/${fileName}`;
  const inputObjectParams = {
    Bucket: BUCKET,
    Key: inputFileKey,
    Expires: 60,
    ContentType: 'text/csv'
  };

  try {
    const s3 = new S3({ region: REGION });
    const url = await s3.getSignedUrlPromise('putObject', inputObjectParams);
    return createResponse(url, STATUS_CODES.OK);
  } catch (error) {
    return createResponse(error, STATUS_CODES.INTERNAL_SERVER_ERROR);
  }
}


module.exports = {
  handler,
};
