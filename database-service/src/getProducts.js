const { Client } = require('pg');
const { dbOptions, respondJson } = require('./common');


async function handler(event) {
  console.log(event);

  const client = new Client(dbOptions);
  let productsList;

  try {
    await client.connect();

    const result = await client.query(`
      SELECT id, title, author, description, count, price
      FROM products
      FULL JOIN stocks
      ON stocks.product_id=products.id;
    `);
    productsList = result.rows;

  } catch(err) {
    console.error(`Error during database request execution: ${err}`);
    return respondJson({message: "Something went wrong"}, 500);

  } finally {
    client.end();
  }

  return respondJson(productsList, 200)
};

module.exports = { handler }
