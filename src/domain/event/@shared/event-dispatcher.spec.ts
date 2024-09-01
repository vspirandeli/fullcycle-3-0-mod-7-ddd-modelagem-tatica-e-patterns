import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe('Domain Events tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);
  })
  
  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    
    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0);
  })

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    
    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

    eventDispatcher.unreisterAll();
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined();
    expect(eventDispatcher.getEventHandlers).toMatchObject({});
  });

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    const notifySpy = jest.spyOn(eventHandler, 'handle');

    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: 'Product 1',
      price: 100,
      quantity: 10,
    });
    eventDispatcher.notify(productCreatedEvent);
    // Qunando o notify for chamado, o método SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    
    expect(notifySpy).toHaveBeenCalled();
  })
})