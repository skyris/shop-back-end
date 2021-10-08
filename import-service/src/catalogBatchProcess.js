const { Client } = require('pg');
const { SNS } = require('aws-sdk');
const { dbOptions, isGoodSchema } = require('./utils/database');
const { createResponse } = require('./utils');
const { STATUS_CODES, ERROR_MESSAGES } = require('./utils/constants');

const { SNS_ARN, REGION } = process.env;

async function handler(event) {
  const row = event.Records.map(({ body }) => body); // ??? Why map ???
  const { title, author, description, price: priceStr, count: countStr } = JSON.parse(row);
  const [ price, count ] = [Number(priceStr), Number(countStr)];
  console.log(`===== ${JSON.stringify({ title, author, description, price, count })}`);
  if (!isGoodSchema({ title, author, description, price, count })) {
    console.log('Bad schema');
    return createResponse(
      { message: ERROR_MESSAGES.INVALID_DATA },
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );
  }
  console.log({ title, author, description, price, count });
  const sns = new SNS({ region: REGION });
  // pg sql
  const client = new Client(dbOptions);
  let result;
  try {
    await client.connect();

    await client.query('BEGIN');
    result = await client.query(`
      WITH new_product AS (
        INSERT INTO products
          (title, author, description, price)
        VALUES
          ($1, $2, $3, $4)
        RETURNING id
      )
      INSERT INTO stocks (product_id, count)
        SELECT id, $5 FROM new_product;
    `, [ title, author, description, price, count ]);
    await client.query('COMMIT');
    console.log(`Result from SQL: ${result}`);

  } catch(err) {
    await client.query('ROLLBACK');
    console.error(`Error during database request execution: ${err}`);
    return createResponse(
      { message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR },
      STATUS_CODES.INTERNAL_SERVER_ERROR
    );

  } finally {
    client.end();
  }


  sns.publish({
    Subject: 'Success',
    Message: 'Data is written to DB',
    TopicArn: SNS_ARN,
  }, () => {
    console.log('Data is written to DB');
  });

  return createResponse('Created', STATUS_CODES.OK);
}


module.exports = {
  handler,
};
