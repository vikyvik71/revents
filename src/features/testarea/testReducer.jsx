import { INCREMENT_COUNTER, DECREMENT_COUNTER } from "./testConstants";
import { createReducer } from "../../app/common/util/reducerUtil";

const initialState = {
    data: 77
}

export const increment = (state, payload) => ({
    ...state,
    data: state.data + 1
});

export const decrement = (state, payload) => ({
    ...state,
    data: state.data - 1
});

const testReducer = createReducer(initialState, {
    [INCREMENT_COUNTER]: increment,
    [DECREMENT_COUNTER]: decrement
});

export default testReducer