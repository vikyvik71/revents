import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT, FETCH_EVENTS } from './eventConstants';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';
import { fetchSampleData } from '../../app/data/mockAPI';

export const createEvent = (event) => ({
    type: CREATE_EVENT,
    payload: {
        event
    }
})

export const updateEvent = (event) => ({
    type: UPDATE_EVENT,
    payload: {
        event
    }
})

export const deleteEvent = (id) => ({
    type: DELETE_EVENT,
    payload: {
        id
    }
})

export const fetchEvents = (events) => ({
    type: FETCH_EVENTS,
    payload: events
})

export const loadEvents = () => {
    return async dispatch => {
        try {
            dispatch(asyncActionStart());
            const events = await fetchSampleData();
            dispatch(fetchEvents(events));
            dispatch(asyncActionFinish());
        } catch (error) {
            console.log(error);
            dispatch(asyncActionError());
        }
    }
}