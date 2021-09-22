const { S3 } = require('aws-sdk');
const csv = require('csv-parser');
const stream = require('stream');
const util = require('util');

const { BUCKET, REGION, INPUT_FOLDER, OUTPUT_FOLDER } = process.env;
const finished = util.promisify(stream.finished);


async function handler(event) {
  const s3 = new S3({ region: REGION });

  for (const record of event.Records) {
    const { key: inputFileKey } = record.s3.object;
    const outputFileKey = inputFileKey.replace(INPUT_FOLDER, OUTPUT_FOLDER);

    const inputObjectParams = {
      Bucket: BUCKET,
      Key: inputFileKey
    }; 

    const outputObjectParams = {
      Bucket: BUCKET,
      CopySource: `${BUCKET}/${inputFileKey}`,
      Key: outputFileKey
    }; 

    const stream = s3.getObject(inputObjectParams).createReadStream();

    await finished(
      stream 
        .on('error', (error) => {
          console.error('ERROR: ', error);
        })
        .pipe(csv())
        .on('data', (data) => {
          console.log(data);
        })
    );

    console.log(`Move from ${BUCKET}/${inputFileKey}`);

    await s3.copyObject(outputObjectParams).promise();
    await s3.deleteObject(inputObjectParams).promise();

    console.log(`Move to ${BUCKET}/${outputFileKey}`);
  }

  return {
    statusCode: 202
  };
}


module.exports = {
  handler,
};

