import { incrementAction, decrementAction, resetAction } from './actions.js';
import reducer from './reducer.js';

export const appState = {
    data: {
        counter: 0,
    },
    subscribers: [],

    subscribe(subscriber) {
        this.subscribers.push(subscriber);
    },

    unsubscribe(subscriber) {
        const index = this.subscribers.indexOf(subscriber);
        if (index !== -1) {
            this.subscribers.splice(index, 1);
        }
    },

    dispatch(action) {
        this.data = reducer(this.data, action);
        this.notifySubscribers(action.type, this.data.counter);
    },

    notifySubscribers(type, value) {
        this.subscribers.forEach((subscriber) => {
            subscriber.onUpdate(type, value);
        });
    },
};

const consoleSubscriber = {
    onUpdate(type, value) {
        console.log(`App State: ${type} changed to ${value}`);
    },
};

appState.subscribe(consoleSubscriber);

// Scenario 1: Initial State
// GIVEN no interactions have been performed yet
// WHEN the "getState" method is run
// AND the result is logged to the console
// AND the browser console is open
// THEN the state should show a count of 0

console.log("Scenario 1: Initial State");
console.log("Initial State:", appState.data.counter); // Display the initial state

// Scenario 2: Increment the counter by one
// GIVEN no interactions have been performed yet
// WHEN an "ADD" action is dispatched
// AND another "ADD" action is dispatched
// AND the browser console is open
// THEN the state should show a count of 2

console.log("Scenario 2: Increment the counter by one");
console.log("Initial State:", appState.data.counter); // Display the initial state
appState.dispatch(incrementAction());
appState.dispatch(incrementAction());
console.log("Updated State:", appState.data.counter); // Display the updated state

// Scenario 3: Decrement the counter by one
// GIVEN the current count in the state is 2
// WHEN a "SUBTRACT" action is dispatched
// AND the browser console is open
// THEN the state should display a count of 1

console.log("Scenario 3: Decrement the counter by one");
appState.dispatch(decrementAction());
console.log("Updated State:", appState.data.counter);

// Scenario 4: Resetting the Tally Counter
// GIVEN the current count in the state is 1
// WHEN a "RESET" action is dispatched
// AND the browser console is open
// THEN the state should display a count of 0

console.log("Scenario 4: Resetting the Tally Counter");
appState.dispatch(resetAction());
console.log("Updated State:", appState.data.counter);