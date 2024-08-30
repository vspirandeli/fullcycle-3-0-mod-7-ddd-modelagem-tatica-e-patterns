import { Address } from "./address";
import { Customer } from "./customer";

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => new Customer('', 'John Doe')).toThrowError('Id is required');
  })

  it('should throw error when name is empty', () => {
    expect(() => new Customer('1', '')).toThrowError('Name is required');
  })

  it('should change name', () => {
    // Arrange
    const customer = new Customer('1', 'John Doe');

    // Act
    customer.changeName('Jane Doe');

    // Assert
    expect(customer.name).toBe('Jane Doe');
  })

  it('should activate customer', () => {
    const customer = new Customer('1', 'Customer 1');
    const address = new Address('Street 1', 12345678, 'City', 'State');
    customer.setAddress(address);

    customer.activate();
    expect(customer.isActive()).toBeTruthy();
  })

  it('should deactivate customer', () => {
    const customer = new Customer('1', 'Customer 1');

    customer.deactivate();
    expect(customer.isActive()).toBeFalsy();
  })

  it('should trhow error when address is empty and try to activate an customer', () => {
    expect(() => {
      const customer = new Customer('1', 'Customer 1');
      customer.activate();
    }).toThrowError('Address is required');
  })

  it('should add reward points', () => {
    const customer = new Customer('1', 'Customer 1');
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);
    
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(20);
  })
})