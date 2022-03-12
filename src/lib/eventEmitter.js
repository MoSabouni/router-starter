//@ts-check
// Adapted from: https://betterprogramming.pub/how-to-create-your-own-event-emitter-in-javascript-fbd5db2447c4

/** @typedef {(name: string, data?: any) => void} ListenerCallback */

/**
 * Create an Event Emitter
 * @returns
 */
const createEventEmitter = () => {
  const events = {};

  /**
   * Add a listener for the specified event name.
   * @param {string} name Name of the event to listen for.
   * @param {ListenerCallback} listener Listener's callback function to add.
   */
  const on = (name, listener) => {
    if (!events[name]) {
      events[name] = [];
    }

    events[name].push(listener);
  };

  /**
   *
   * @param {string} name Name of the event from which the listener is to be removed.
   * @param {ListenerCallback} listenerToRemove Listener's callback function to remove.
   */
  const removeListener = (name, listenerToRemove) => {
    if (!events[name]) {
      throw new Error(
        `Can't remove a listener. Event "${name}" doesn't exits.`
      );
    }

    const filterListeners = (listener) => listener !== listenerToRemove;

    events[name] = events[name].filter(filterListeners);
  };

  /** Emit an event.
   * @param {string} name Event name.
   * @param {object} [data] Event data.
   */
  const emit = (name, data) => {
    if (!events[name]) {
      throw new Error(`Can't emit an event. Event "${name}" doesn't exits.`);
    }

    const fireCallbacks = (callback) => {
      callback(data);
    };

    events[name].forEach(fireCallbacks);
  };

  return { on, removeListener, emit };
};

export default createEventEmitter;
