import { HttpEventRequest, HttpResponse } from './types';
import { respondJson } from './common';
import productsList from './data/productsList.json';


export async function handler(event: HttpEventRequest): HttpResponse {
  return respondJson(productsList, 200);
}
