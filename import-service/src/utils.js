const customPromisify = (fn, ...args) => {
  return new Promise(
    (resolve, reject) => {
      try {
        fn(...args, (err, data) => {
          if (err) reject(err);
          else resolve(data);
        });
      } catch(error) {
        reject(error);
      }
    }
  );
}

const createResponse = (data, code) => {
  return {
    statusCode: code,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: typeof data === 'object' ? JSON.stringify(data) : data
  };
}

module.exports = {
  customPromisify,
  createResponse,
};
