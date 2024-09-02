import ProductFactory from "./product.factory";

describe('Product Factory Unit Test', () => {
  it('should create a product type a', () => {
    const product = ProductFactory.createProduct('a', 'Product A', 1);
    expect(product).toBeDefined();
    expect(product.name).toBe('Product A');
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe('Product');
  })

  it('should create a product type b', () => {
    const product = ProductFactory.createProduct('b', 'Product B', 1);
    expect(product).toBeDefined();
    expect(product.name).toBe('Product B');
    expect(product.price).toBe(2);
    expect(product.constructor.name).toBe('ProductB');
  })

  it('should throw an error when invalid product type', () => {
    expect(() => ProductFactory.createProduct('c', 'Product C', 1)).toThrowError('Invalid product type');
  })
})