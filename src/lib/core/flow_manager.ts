// interface EventSubscriber {
//     emitter: any;
//     type: string;
//     listener: any;
//     once: boolean;
//     cb: Function;
//   };
  
//   /**
//    * Singleton managing subscribing to and emitting events.
//    */
//   class FlowManager {
//     subscribers: Array<EventSubscriber>;
  
//     constructor() {
//       this.subscribers = [];
//     }
  
//     /**
//      * Returns a promise that resolves when a specific event is emitted.
//      * 
//      * @param {any} emitter - Is an object that emits events. It could be any object.
//      * @param {string} type - The event type name.
//      */
//     wait(emitter: any, type: string): Promise<any> {
//       return new Promise(resolve => {
//         this.subscribeOnce(emitter, type, this, (data: any) => {
//           resolve(data);
//         });
//       });
//     }
  
//     /**
//      * Adds a new subscriber.
//      * 
//      * @param {any} emitter - Is an object that emits events. It could be any object.
//      * @param {string} type - The event type name.
//      * @param {any} listener - Is the object that is subscribed to the event and usually the context of the callback function.
//      * @param {Function} cb - Is a callback function that will be executed when the event is triggered.
//      */
//     subscribe(emitter: any, type: string, listener: any, cb: Function): void {
//       this.subscribers.push({ emitter: emitter, type: type, listener: listener, once: false, cb: cb });
//     }
//   }
  
//   export { EventManager };
//   export const eventManager = new EventManager();