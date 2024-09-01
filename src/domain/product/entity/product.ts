export class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;

    this.validate();
  }

  get id(): string {
    return this._id;
  }

  validate(): boolean {
    if (!this._id) {
      throw new Error('Product id is required');
    }

    if (!this._name) {
      throw new Error('Product name is required');
    }

    if (this._price <= 0) {
      throw new Error('Product price must be greater than zero');
    }

    return true;
  }

  changeName(name: string): void {
    this._name = name;

    this.validate();
  }

  get name(): string {
    return this._name;
  }

  changePrice(price: number): void {
    this._price = price;

    this.validate();
  }

  get price(): number {
    return this._price;
  }
}