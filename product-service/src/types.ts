import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export type HttpEventRequest<T = null> = Omit<APIGatewayProxyEvent, 'pathParameters'> & {
  pathParameters: T
}

export type HttpResponse = Promise<APIGatewayProxyResult>;

export type Product = {
  id: string;
  title: string;
  author: string;
  description: string;
  count: number;
  price: number;
}
export type ErrorResponse = {
  success: false;
  error: object;
}

export type Response = Product | Product[] | ErrorResponse;
