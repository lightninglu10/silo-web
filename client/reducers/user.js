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
}

module.exports = function userReducer(state = initialState, action) {
    switch(action.type) {
        case types.SIGNUP_ERROR:
        case types.SIGNUP_COMPLETE:
        case types.FETCHED_LOGIN:
        case types.FACEBOOK_LOGIN_REQUEST:
        case types.FACEBOOK_LOGIN_SUCCESS:
        return {
            ...state,
            ...action,
        }

        default:
        return state;
    }
}