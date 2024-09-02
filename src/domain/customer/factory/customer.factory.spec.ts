import { Address } from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe('Customer Factory Unit Test', () => {
  it('should create a customer', () => {
    const newCustomer = CustomerFactory.create("John Doe");
    expect(newCustomer.name).toEqual("John Doe");
    expect(newCustomer.id).toBeDefined();
    expect(newCustomer.address).toBeUndefined();
  });

  it('should create a customer with address', () => {
    const address = new Address('street', 123, 'city', 'zip', 'state');
    const newCustomer = CustomerFactory.createWithAddress("John Doe", address);
    expect(newCustomer.name).toEqual("John Doe");
    expect(newCustomer.id).toBeDefined();
    expect(newCustomer.address).toEqual(address);
  })
});