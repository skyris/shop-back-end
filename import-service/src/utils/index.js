const { CORS_HEADERS } = require('./constants');


const createResponse = (data, code) => {
  return {
    statusCode: code,
    headers: CORS_HEADERS,
    body: typeof data === 'object' ? JSON.stringify(data) : data
  };
}

module.exports = {
  createResponse,
};
