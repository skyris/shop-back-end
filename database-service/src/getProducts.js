const { Client } = require('pg');
const { dbOptions, respondJson } = require('./common');


async function handler(event) {
  let productsList;

  const client = new Client(dbOptions);
  await client.connect();

  try {
    const result = await client.query(`SELECT * FROM products;`);
    productsList = result.rows;

  } catch(err) {
    console.error(`Error during database request execution: ${err}`);

  } finally {
    client.end();
  }

  return respondJson(productsList, 200)
};

module.exports = { handler }
