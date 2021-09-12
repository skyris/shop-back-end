import { ErrorResponse } from '../types';

export const notFoundError: ErrorResponse = {
  success: false,
  error: { message: 'Product not found' }
}
