import { v4 as uuid } from 'uuid';
import OrderFactory from './order.factory';

describe('Order factory unit test', () => {
  it('should create an order', () => {
    const orderProps = {
      id: uuid(),
      customerId: uuid(),
      items: [
        { id: uuid(), name: 'product-1', productId: uuid(), quantity: 1, price: 100 },
      ]
    }
    const newOrder = OrderFactory.create(orderProps);
    expect(newOrder.id).toEqual(orderProps.id);
    expect(newOrder.customerId).toEqual(orderProps.customerId);
    expect(newOrder.items).toMatchObject(orderProps.items);
    expect(newOrder.items.length).toBe(1);
  })
});