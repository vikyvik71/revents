import { INCREMENT_COUNTER, DECREMENT_COUNTER, COUNTER_ACTION_STARTED, COUNTER_ACTION_FINISHED } from "./testConstants";
import { createReducer } from "../../app/common/util/reducerUtil";

const initialState = {
    data: 77,
    loading: false
}

export const increment = (state, payload) => ({
    ...state,
    data: state.data + 1
});

export const decrement = (state, payload) => ({
    ...state,
    data: state.data - 1
});

export const counterActionStarted = (state, payload) => ({ ...state, loading: true });

export const counterActionFinished = (state, payload) => ({ ...state, loading: false });

const testReducer = createReducer(initialState, {
    [INCREMENT_COUNTER]: increment,
    [DECREMENT_COUNTER]: decrement,
    [COUNTER_ACTION_STARTED]: counterActionStarted,
    [COUNTER_ACTION_FINISHED]: counterActionFinished
});

export default testReducer