# EventManager

Singleton managing subscribing to and emitting events.
## Constructors
* **new EventManager**(): EventManager   
## Methods
* **emit**(emitter: any, type: string, data: any): void   
  * **emitter**: Is an object that emits events. It could be any object.
  * **type**: The event type name.
  * **data**: Custom data that will be passed to the callback function of each subscriber.
* **emitAsync**(emitter: any, type: string, data: any): Promise   
  * **emitter**: Is an object that emits events. It could be any object.
  * **type**: The event type name.
  * **data**: Custom data that will be passed to the callback function of each subscriber.
* **subscribe**(emitter: any, type: string, listener: any, cb: Function): void   
  * **emitter**: Is an object that emits events. It could be any object.
  * **type**: The event type name.
  * **listener**: Is the object that is subscribed to the event and usually the context of the callback function.
  * **cb**: Is a callback function that will be executed when the event is triggered.
* **subscribeOnce**(emitter: any, type: string, listener: any, cb: Function): void   
  * **emitter**: Is an object that emits events. It could be any object.
  * **type**: The event type name.
  * **listener**: Is the object that is subscribed to the event and usually the context of the callback function.
  * **cb**: Is a callback function that will be executed when the event is triggered.
* **unsubscribe**(emitter: any, type: string, listener: any): void   
  * **emitter**: Is an object that emits events. It could be any object.
  * **type**: The event type name.
  * **listener**: Is the object that is subscribed to the event and usually the context of the callback function.
* **unsubscribeAll**(): void   
* **wait**(emitter: any, type: string): Promise   
  * **emitter**: Is an object that emits events. It could be any object.
  * **type**: The event type name.
