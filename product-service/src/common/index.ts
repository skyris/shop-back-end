export function respondJson(body: Object, statusCode: number) {
	return {
		statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
    },
		body: JSON.stringify(body)
	}
}
