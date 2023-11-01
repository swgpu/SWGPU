interface EventSubscriber {
  emitter: any;
  type: string;
  listener: any;
  once: boolean;
  cb: Function;
};

/**
 * The `EventManager` class is a singleton for managing subscribing to and emitting events.
 */
class EventManager {
  subscribers: Array<EventSubscriber>;

  /**
   * The constructor.
   */
  constructor() {
    this.subscribers = [];
  }

  /**
   * The "wait" function returns a promise that resolves when a specific event is emitted.
   * @param {any} emitter - The `emitter` parameter is an object that emits events. It could be any object.
   * @param {string} type - The `type` parameter is a string that represents the type of event or message
   * that you want to wait for. It is used to filter the events emitted by the `emitter` object.
   * @returns a Promise that resolves with the data emitted by the specified emitter and event type.
   */
  wait(emitter: any, type: string): Promise<any> {
    return new Promise(resolve => {
      this.subscribeOnce(emitter, type, this, (data: any) => {
        resolve(data);
      });
    });
  }

  /**
   * The "subscribe" function adds a new subscriber to a list of subscribers.
   * @param {any} emitter - The `emitter` parameter is an object that emits events. It could be any object.
   * @param {string} type - The `type` parameter is a string that represents the type of event or message
   * that you want to wait for. It is used to filter the events emitted by the `emitter` object.
   * @param {any} listener - The `listener` parameter is the object that is subscribed to the event and usually the context of the callback function.
   * @param {Function} cb - The `cb` parameter is a callback function that will be executed when the
   * event is triggered.
   */
  subscribe(emitter: any, type: string, listener: any, cb: Function): void {
    this.subscribers.push({ emitter: emitter, type: type, listener: listener, once: false, cb: cb });
  }

  /**
   * The "subscribeOnce" function adds a new subscriber to a list of subscribers and delete self after the first event trigger.
   * @param {any} emitter - The `emitter` parameter is an object that emits events. It could be any object.
   * @param {string} type - The `type` parameter is a string that represents the type of event or message
   * that you want to wait for. It is used to filter the events emitted by the `emitter` object.
   * @param {any} listener - The `listener` parameter is the object that is subscribed to the event and usually the context of the callback function.
   * @param {Function} cb - The `cb` parameter is a callback function that will be executed when the
   * event is triggered.
   */
  subscribeOnce(emitter: any, type: string, listener: any, cb: Function): void {
    this.subscribers.push({ emitter: emitter, type: type, listener: listener, once: true, cb: cb });
  }

  /**
   * The "unsubscribe" function removes a specific listener from the list of subscribers for a given
   * emitter and event type.
   * @param {any} emitter - The `emitter` parameter is an object that emits events. It could be any object.
   * @param {string} type - The `type` parameter is a string that represents the type of event or message
   * that you want to wait for. It is used to filter the events emitted by the `emitter` object.
   * @param {any} listener - The `listener` parameter is the object that is subscribed to the event and usually the context of the callback function.
   * @returns void, which means it does not return any value.
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
   * The "unsubscribeAll" function clears all subscribers from the "subscribers" array.
   */
  unsubscribeAll(): void {
    this.subscribers = [];
  }

  /**
   * The "emit" function notifies subscribers of an event and returns a promise that
   * resolves when all subscriber callbacks have been executed.
   * @param {any} emitter - The `emitter` parameter is an object that emits events. It could be any object.
   * @param {string} type - The `type` parameter is a string that represents the type of event or message
   * that you want to wait for. It is used to filter the events emitted by the `emitter` object.
   * @param {any} data - The `data` parameter is an optional parameter of type `any` which represents the
   * data that will be passed to the callback function of each subscriber.
   * @returns a Promise that resolves when all callbacks have been executed.
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