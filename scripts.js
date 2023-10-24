import { appState } from "./store.js";
import { incrementAction, decrementAction, resetAction } from "./actions.js";

// Get DOM elements
const numberInput = document.querySelector('[data-key="number"]');
const subtractButton = document.querySelector('[data-key="subtract"]');
const addButton = document.querySelector('[data-key="add"]');
const resetButton = document.querySelector('[data-key="reset"]');

// Event handler for subtracting one from the current number value
const subtractHandler = () => {
    appState.dispatch(decrementAction());
    numberInput.value = appState.data.counter.toString();
};

// Event handler for adding one to the current number value
const addHandler = () => {
    appState.dispatch(incrementAction());
    numberInput.value = appState.data.counter.toString();
};

// Event handler for resetting the counter
const resetHandler = () => {
    appState.dispatch(resetAction());
    numberInput.value = "0";
    subtractButton.disabled = false;
    addButton.disabled = false;
    alert("Counter has been reset");
};

// Add event listeners
resetButton.addEventListener('click', resetHandler);
subtractButton.addEventListener('click', subtractHandler);
addButton.addEventListener('click', addHandler);