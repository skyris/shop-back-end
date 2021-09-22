const { S3 } = require('aws-sdk');
const { customPromisify, createResponse } = require('./utils');

const { BUCKET, REGION, INPUT_FOLDER } = process.env;


async function handler(event) {
  const { name: fileName } = event.queryStringParameters;
  const inputFileKey = `${INPUT_FOLDER}/${fileName}`;
  const inputObjectParams = {
    Bucket: BUCKET,
    Key: inputFileKey,
    Expires: 360,
    ContentType: 'text/csv'
  };

  try {
    const s3 = new S3({ region: REGION });
    const url = await customPromisify(
      s3.getSignedUrl.bind(s3), 'putObject', inputObjectParams
    );
    return createResponse(url, 200)
  } catch (error) {
    return createResponse(error, 500);
  }
}


module.exports = {
  handler,
};
