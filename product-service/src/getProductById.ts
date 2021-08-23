import { HttpEventRequest, HttpResponse, Product, ErrorResponse } from './types';
import productsList from './data/productsList.json';
import { respondJson } from './common';

const notFoundError: ErrorResponse = {
  success: false,
  error: { message: 'Product not found' }
}
export async function handler(event: HttpEventRequest<{ productId: string }>): HttpResponse {
  const { productId } = event.pathParameters;
  const result = productsList.filter(product => product.id === productId)
  let product: Product;
  if (result.length === 0) {
    return respondJson(notFoundError, 404);
  }
  product = result[0];
  return respondJson(product, 200);
}
