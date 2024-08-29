import Order from "./order";
import OrderItem from "./order_item";

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const order = new Order('', 'customer-id', []);
    }).toThrowError('Order id is required');
  })

  it('should trhow error when customerId is empty', () => {
    expect(() => {
      const order = new Order('order-id', '', []);
    }).toThrowError('Order customer id is required');
  })

  it('should throw error when items is empty', () => {
    expect(() => {
      const order = new Order('order-id', 'customer-id', []);
    }).toThrowError('Order items are required');
  })

  it('should calculate total', () => {
    const item = new OrderItem('item-id', 'item-name', 100);
    const item2 = new OrderItem('item-id', 'item-name', 120);

    const order = new Order('order-id', 'customer-id', [item]);
    const total = order.total();
    expect(total).toBe(100);

    const order2 = new Order('order-2-id', 'customer-id', [item, item2]);
    const total2 = order2.total();
    expect(total2).toBe(220);


  })
})