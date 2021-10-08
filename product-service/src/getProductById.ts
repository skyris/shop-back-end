import { HttpEventRequest, HttpResponse, Product } from './types';
import productsList from './data/productsList.json';
import { respondJson } from './common';
import { notFoundError } from './common/errors'

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
