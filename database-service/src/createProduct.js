const { Client } = require('pg');
const { dbOptions, respondJson } = require('./common');


async function handler(event) {
  console.log(event);
  const { title, author, description, price, count } = JSON.parse(event.body);
  if (title === undefined || author === undefined || description === undefined || price === undefined || count === undefined) {
    return respondJson("Product data is invalid", 400);
  }

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

    console.log(result);
  } catch(err) {
    await client.query('ROLLBACK');
    console.error(`Error during database request execution: ${err}`);
    return respondJson({message: "Something went wrong"}, 500);

  } finally {
    client.end();
  }

  return respondJson(result, 200);
};

module.exports = { handler }
