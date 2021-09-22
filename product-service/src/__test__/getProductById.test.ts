import { handler } from '../getProductById';
import { respondJson } from '../common';
import { httpEventMock } from './mocks/httpEventMock';
import { getProductByIdSuccessResponse } from './mocks/getProductByIdSuccessResponse'
import { notFoundError } from '../common/errors';


const defaultEvent = {
  ...httpEventMock,
  pathParameters: { productId: getProductByIdSuccessResponse.id },
} as any;

const wrongEvent = {
  ...httpEventMock,
  pathParameters: { productId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' },
} as any;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('New description', () => {
  it('should respond right product by id', async () => {
    const actual = await handler(defaultEvent);
    const expected = respondJson(getProductByIdSuccessResponse, 200);
    expect(actual).toEqual(expected);
  });

  it('should respond empty object', async () => {
    const actual = await handler(wrongEvent);
    const expected = respondJson(notFoundError, 404);
    expect(actual).toEqual(expected);
  });
});
