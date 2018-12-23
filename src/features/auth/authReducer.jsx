import { LOGIN_USER, SIGN_OUT_USER } from './authConstants';
import { createReducer } from '../../app/common/util/reducerUtil';

const initialState = {
    currentUser: {}
}

export const loginUser = (state, payload) => ({
    ...state,
    authenticated: true,
    currentUser: payload.creds.email
});

export const logoutUser = (state, payload) => ({
    ...state,
    authenticated: false
});

export default createReducer(initialState, {
    [LOGIN_USER]: loginUser,
    [SIGN_OUT_USER]: logoutUser
})