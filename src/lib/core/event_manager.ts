interface EventSubscriber {
  emitter: any;
  type: string;
  listener: any;
  once: boolean;
  cb: Function;
};

/**
 * Singleton managing subscribing to and emitting events.
 */
class EventManager {
  subscribers: Array<EventSubscriber>;

  constructor() {
    this.subscribers = [];
  }

  /**
   * Returns a promise that resolves when a specific event is emitted.
   * 
   * @param {any} emitter - Is an object that emits events. It could be any object.
   * @param {string} type - The event type name.
   */
  wait(emitter: any, type: string): Promise<any> {
    return new Promise(resolve => {
      this.subscribeOnce(emitter, type, this, (data: any) => {
        resolve(data);
      });
    });
  }

  /**
   * Adds a new subscriber.
   * 
   * @param {any} emitter - Is an object that emits events. It could be any object.
   * @param {string} type - The event type name.
   * @param {any} listener - Is the object that is subscribed to the event and usually the context of the callback function.
   * @param {Function} cb - Is a callback function that will be executed when the event is triggered.
   */
  subscribe(emitter: any, type: string, listener: any, cb: Function): void {
    this.subscribers.push({ emitter: emitter, type: type, listener: listener, once: false, cb: cb });
  }

  /**
   * Adds a new subscriber and delete self after the first event trigger.
   * 
   * @param {any} emitter - Is an object that emits events. It could be any object.
   * @param {string} type - The event type name.
   * @param {any} listener - Is the object that is subscribed to the event and usually the context of the callback function.
   * @param {Function} cb - Is a callback function that will be executed when the event is triggered.
   */
  subscribeOnce(emitter: any, type: string, listener: any, cb: Function): void {
    this.subscribers.push({ emitter: emitter, type: type, listener: listener, once: true, cb: cb });
  }

  /**
   * Removes a specific subscriber for a given emitter, event type and listener.
   * 
   * @param {any} emitter - Is an object that emits events. It could be any object.
   * @param {string} type - The event type name.
   * @param {any} listener - Is the object that is subscribed to the event and usually the context of the callback function.
   */
  unsubscribe(emitter: any, type: string, listener: any): void {
    for (let subscriber of this.subscribers) {
      if (subscriber.emitter == emitter && subscriber.type == type && subscriber.listener == listener) {
        this.subscribers.splice(this.subscribers.indexOf(subscriber), 1);
        return;
      }
    }
  }

  /**
   * Remove all subscribers.
   */
  unsubscribeAll(): void {
    this.subscribers = [];
  }

  /**
   * Notifies subscribers of an event and returns a promise that resolves when all subscriber callbacks have been executed.
   * 
   * @param {any} emitter - Is an object that emits events. It could be any object.
   * @param {string} type - The event type name.
   * @param {any} data - Custom data that will be passed to the callback function of each subscriber.
   */
  async emit(emitter: any, type: string, data: any = {}): Promise<any> {
    const promises: Array<Promise<any>> = [];

    for (const subscriber of this.subscribers.slice()) {
      if (subscriber.emitter == emitter && subscriber.type == type) {
        const res = subscriber.cb.call(subscriber.listener, data);
        if (res instanceof Promise) {
          promises.push(res);
        }

        if (subscriber.once) {
          this.subscribers.splice(this.subscribers.indexOf(subscriber), 1);
        }
      }
    }

    return Promise.all(promises);
  }
}

export { EventManager };
export const eventManager = new EventManager();