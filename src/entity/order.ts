import OrderItem from "./order_item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: Array<OrderItem> = [];
  private _total: number = 0;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();

    this.validate();
  }

  validate(): boolean {
    if (!this._id) {
      throw new Error('Order id is required');
    }

    if (!this._customerId) {
      throw new Error('Order customer id is required');
    }

    if (!this._items.length) {
      throw new Error('Order items are required');
    }

    return true;
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
  }
}