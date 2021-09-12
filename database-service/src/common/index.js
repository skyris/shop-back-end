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


module.exports = { dbOptions, respondJson };
