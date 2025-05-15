interface EventSubscriber {
    emitter: any;
    type: string;
    listener: any;
    once: boolean;
    cb: Function;
}
/**
 * Singleton managing subscribing to and emitting events.
 */
declare class EventManager {
    subscribers: Array<EventSubscriber>;
    constructor();
    /**
     * Returns a promise that resolves when a specific event is emitted.
     *
     * @param {any} emitter - Is an object that emits events. It could be any object.
     * @param {string} type - The event type name.
     */
    wait(emitter: any, type: string): Promise<any>;
    /**
     * Adds a new subscriber.
     *
     * @param {any} emitter - Is an object that emits events. It could be any object.
     * @param {string} type - The event type name.
     * @param {any} listener - Is the object that is subscribed to the event and usually the context of the callback function.
     * @param {Function} cb - Is a callback function that will be executed when the event is triggered.
     */
    subscribe(emitter: any, type: string, listener: any, cb: Function): void;
    /**
     * Adds a new subscriber and delete self after the first event trigger.
     *
     * @param {any} emitter - Is an object that emits events. It could be any object.
     * @param {string} type - The event type name.
     * @param {any} listener - Is the object that is subscribed to the event and usually the context of the callback function.
     * @param {Function} cb - Is a callback function that will be executed when the event is triggered.
     */
    subscribeOnce(emitter: any, type: string, listener: any, cb: Function): void;
    /**
     * Removes a specific subscriber for a given emitter, event type and listener.
     *
     * @param {any} emitter - Is an object that emits events. It could be any object.
     * @param {string} type - The event type name.
     * @param {any} listener - Is the object that is subscribed to the event and usually the context of the callback function.
     */
    unsubscribe(emitter: any, type: string, listener: any): void;
    /**
     * Remove all subscribers.
     */
    unsubscribeAll(): void;
    /**
     * Notifies subscribers of an event and returns a promise that resolves when all subscriber callbacks have been executed.
     *
     * @param {any} emitter - Is an object that emits events. It could be any object.
     * @param {string} type - The event type name.
     * @param {any} data - Custom data that will be passed to the callback function of each subscriber.
     */
    emitAsync(emitter: any, type: string, data?: any): Promise<any>;
    /**
     * Notifies subscribers of an event and returns a promise that resolves when all subscriber callbacks have been executed.
     *
     * @param {any} emitter - Is an object that emits events. It could be any object.
     * @param {string} type - The event type name.
     * @param {any} data - Custom data that will be passed to the callback function of each subscriber.
     */
    emit(emitter: any, type: string, data?: any): void;
}
export { EventManager };
export declare const eventManager: EventManager;
