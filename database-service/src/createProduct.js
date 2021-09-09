const { Client } = require('pg');
const { dbOptions, respondJson } = require('./common');


async function handler(event) {
  console.log(event);
  const { title, author, description, price, count } = JSON.parse(event.body);
  if (title === undefined || author === undefined || description === undefined || price === undefined || count === undefined) {
    return respondJson("Product data is invalid", 400);
  }

  let client;
  let result;
  try {
    client = new Client(dbOptions);
    await client.connect();

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

    console.log(result);
  } catch(err) {
    console.error(`Error during database request execution: ${err}`);
    return respondJson({message: "Something went wrong"}, 500);

  } finally {
    client.end();
  }

  return respondJson(result, 200);
};

module.exports = { handler }
