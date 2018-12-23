import { INCREMENT_COUNTER, DECREMENT_COUNTER, COUNTER_ACTION_STARTED, COUNTER_ACTION_FINISHED } from './testConstants';

export const increment = () => ({
    type: INCREMENT_COUNTER
})

export const decrement = () => ({
    type: DECREMENT_COUNTER
})

export const startCounterAction = () => {
    return {
        type: COUNTER_ACTION_STARTED
    }
}

export const finishCounterAction = () => {
    return {
        type: COUNTER_ACTION_FINISHED
    }
}

const delay = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const incrementAsync = () => {
    return async dispatch => {
        dispatch(startCounterAction());
        await delay(3000);
        dispatch({ type: INCREMENT_COUNTER });
        dispatch(finishCounterAction());
    }
}

export const decrementAsync = () => {
    return async dispatch => {
        dispatch(startCounterAction());
        await delay(3000);
        dispatch({ type: DECREMENT_COUNTER });
        dispatch(finishCounterAction());
    }
}