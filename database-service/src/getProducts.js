const { Client } = require('pg');
const { dbOptions, respondJson } = require('./common');


async function handler(event) {
  console.log(event);

  let client;
  let productsList;

  try {
    client = new Client(dbOptions);
    await client.connect();

    const result = await client.query(`SELECT * FROM products;`);
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
