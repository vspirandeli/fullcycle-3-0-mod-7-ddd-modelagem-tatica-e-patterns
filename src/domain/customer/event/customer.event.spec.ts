import { Sequelize } from "sequelize-typescript";

import { Address } from "../value-object/address";
import { Customer } from "../entity/customer";

import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import CustomerChangeAddressEvent from "./customer-change-address.event";
import EnviaConsoleLogHandler from "./handler/envia-console-log-1.handler";
import EnviaConsoleLog1Handler from "./handler/envia-console-log-1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log-2.handler";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";


describe("Domain events tests", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should register customer created event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new EnviaConsoleLog1Handler();


    eventDispatcher.register("CustomerCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const eventHandler2 = new EnviaConsoleLog2Handler();
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(
      2
    );
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler2);

  });

  it("should notify customer created event handlers", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventMessage1Handler = new EnviaConsoleLog1Handler();
    const eventMessage2Handler = new EnviaConsoleLog2Handler();

    const spy1EventHandler = jest.spyOn(eventMessage1Handler, "handle");
    const spy2EventHandler = jest.spyOn(eventMessage2Handler, "handle");


    eventDispatcher.register("CustomerCreatedEvent", eventMessage1Handler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventMessage1Handler);

    eventDispatcher.register("CustomerCreatedEvent", eventMessage2Handler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventMessage2Handler);

    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "City 1", "Zip 1", "State 1");
    customer.setAddress(address);
    customer.addRewardPoints(10);
    customer.activate();

    await customerRepository.create(customer);

    const customerCreatedEvent = new CustomerCreatedEvent(customer);


    eventDispatcher.notify(customerCreatedEvent);

    expect(spy1EventHandler).toHaveBeenCalled();
    expect(spy2EventHandler).toHaveBeenCalled();
  });

  it("should notify customer change address event handlers", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventMessageHandler = new EnviaConsoleLog1Handler();
    const eventMessageChangeAddressHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventMessageHandler, "handle");
    const spyEventChangeAddressHandler = jest.spyOn(eventMessageChangeAddressHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventMessageHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventMessageHandler);

    eventDispatcher.register("CustomerChangeAddressEvent", eventMessageChangeAddressHandler);
    expect(
      eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]
    ).toMatchObject(eventMessageChangeAddressHandler);


    const customerRepository = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 1, "City 1", "Zip 1", "State 1");
    customer.setAddress(address);
    customer.addRewardPoints(10);
    customer.activate();

    await customerRepository.create(customer);
    const customerCreatedEvent = new CustomerCreatedEvent(customer);
    eventDispatcher.notify(customerCreatedEvent);

    const address2 = new Address("Street 2", 2, "City 2", "Zip 2", "State 2");
    customer.setAddress(address2)

    const customerChangeAddresEvent = new CustomerChangeAddressEvent(customer);

    eventDispatcher.notify(customerChangeAddresEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyEventChangeAddressHandler).toHaveBeenCalled();
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler2 = new EnviaConsoleLog1Handler();
    const eventHandler3 = new EnviaConsoleLog2Handler();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandler2);

    eventDispatcher.register("CustomerCreatedEvent", eventHandler3);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandler3);

    eventDispatcher.unreisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });
})