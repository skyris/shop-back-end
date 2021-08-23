import { handler} from '../getProductsList';
import { respondJson } from '../common';
import { httpEventMock } from './mocks/httpEventMock';
import productsList from '../data/productsList.json'

const defaultEvent = {
  ...httpEventMock
} as any;

beforeEach(() => {
  jest.clearAllMocks();
});

describe('getProductsList handler', () => {
  it('should respond products list', async () => {
    const actual = await handler(defaultEvent);
    const expected = respondJson(productsList, 200);
    expect(actual).toEqual(expected);
  });
});
