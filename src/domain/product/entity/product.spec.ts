import { Product } from "./product";

describe('Product unit tests', () => {
  
  it('should throw error when id is empty', () => {
    expect(() => {
      const product = new Product('', 'product 1', 100);
    }).toThrowError('Product id is required');
  })

  it('should throw error when name is empty', () => {
    expect(() => {
      const product = new Product('product-id', '', 100);
    }).toThrowError('Product name is required');
  })

  it('should throw new error when price is less than zero', () => {
    expect(() => {
      const product = new Product('product-id', 'product 1', -1);
    }).toThrowError('Product price must be greater than zero');
  })

  it('should change name', () => {
    const product = new Product('product-id', 'product 1', 100);
    product.changeName('product 2');
    expect(product.name).toEqual('product 2');
  })

  it('should change price', () => {
    const product = new Product('product-id', 'product 1', 100);
    product.changePrice(200);
    expect(product.price).toEqual(200);
  })
})