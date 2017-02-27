/**
* Silo
* user reducer
* author: @patr
*/

import types from '../config/action-types';

const initialState = {
    isLoggedIn: false,
    isFacebookFetching: false,
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    contacts: [],
    groups: [],
}

module.exports = function userReducer(state = initialState, action) {
    switch(action.type) {
        case types.SIGNUP_ERROR:
        case types.SIGNUP_COMPLETE:
        case types.FETCHED_LOGIN:
        case types.FACEBOOK_LOGIN_REQUEST:
        case types.FACEBOOK_LOGIN_SUCCESS:
        case types.FETCHED_USER_INFO:
        case types.LOGOUT_COMPLETE:
        case types.GET_GROUPS:
        return {
            ...state,
            ...action,
        }

        default:
        return state;
    }
}