import { log } from './logger.js';

/**
 * Create a new observable
 * @returns
 */
function createAppState() {
  let state = {};
  const subscribers = new Set();
  return {
    subscribe(subscriber) {
      subscribers.add(subscriber);
      return () => subscribers.delete(subscriber);
    },
    update(data) {
      const newState = { ...state, ...data };
      log.debug('state', newState, state);

      subscribers.forEach((subscriber) => subscriber(newState, state));
      state = newState;
    },
  };
}
export const appState = createAppState();
