const { PG_HOST, PG_DATABASE, PG_PORT, PG_USER, PG_PASSWORD } = process.env;

const dbOptions = {
  host: PG_HOST,
  port: Number(PG_PORT),
  database: PG_DATABASE,
  user: PG_USER,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false,
  },
  connectionTimeoutMillis: 5000
};

function respondJson(body, statusCode) {
	return {
		statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': true,
    },
		body: JSON.stringify(body)
	}
}

const isNumber = value => typeof value === 'number';

function isGoodSchema({ title, author, description, price, count }) {
  if (title === undefined || author === undefined || description === undefined || price === undefined || count === undefined || !isNumber(price) || !isNumber(count)) {
    return false;
  }
  return true;
}

module.exports = { dbOptions, respondJson, isNumber, isGoodSchema };
