import { createReducer } from '../../app/common/util/reducerUtil';
import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from './eventConstants';

const initialState = [];


export const createEvent = (state, payload) => { 
    return [...state, Object.assign({}, payload.event)]
};

export const updateEvent = (state, payload) => {    
    return [...state.filter(event => event.id !== payload.event.id), Object.assign({}, payload.event)];
};

export const deleteEvent = (state, payload) => {
    return [...state.filter(event => event.id !== payload.id)];
};

export const fetchEvents = (state, payload) => {
    return payload.events;
};

const eventReducer = createReducer(initialState, {
    [CREATE_EVENT]: createEvent,
    [DELETE_EVENT]: deleteEvent,
    [UPDATE_EVENT]: updateEvent,
    [FETCH_EVENTS]: fetchEvents
});

export default eventReducer;
