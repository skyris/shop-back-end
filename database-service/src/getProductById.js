const { Client } = require('pg');
const { dbOptions, respondJson } = require('./common');
const { notFoundError } = require('./common/errors');


async function handler(event) {
  console.log(event);
  const { productId } = event.pathParameters;

  let client;
  let product;

  try {
    client = new Client(dbOptions);
    await client.connect();

    const result = await client.query(`
      SELECT id, title, author, description, count, price
      FROM products
      FULL JOIN stocks
      ON stocks.product_id=products.id
      WHERE id=$1;
    `, [ productId ]);

    product = result.rows;

  } catch(err) {
    console.error(`Error during database request execution: ${err}`);
    return respondJson({message: "Something went wrong"}, 500);

  } finally {
    client.end();
  }

  if (product.length > 0) {
    return respondJson(product[0], 200);
  }
  return respondJson(notFoundError, 404);
};

module.exports = { handler }
