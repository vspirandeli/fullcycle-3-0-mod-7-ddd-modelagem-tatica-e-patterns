import { Customer } from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item"
import OrderService from "./order.service";

describe('Service unit tests', () => {
  it('should get total of all orders', () => {
    const orderItem = new OrderItem('item-1', 'item 1', 100, 'p1', 1);
    const orderItem2 = new OrderItem('item-2', 'item 2', 200, 'p2', 2);
    
    const order = new Order('order-1', 'customer-1', [orderItem]);
    const order2 = new Order('order-2', 'customer-1', [orderItem2]);

    const total = OrderService.total([order, order2]);

    expect(total).toBe(500);
  })

  it('should place an order', () => {
    const customer  = new Customer('customer-1', 'customer 1');
    const orderItem = new OrderItem('item-1', 'item 1', 10, 'p1', 1);

    const order = OrderService.placeOrder(customer, [orderItem]);

    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  })
})