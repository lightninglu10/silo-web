/**
* Silo
* messages reducer
* author: @patr
*/

import types from '../config/action-types';

const initialState = {
    isFetchingUserList: false,
    userList: [
    ],
    activeMessage: {
        messages: [],
        name: '',
        number: '',
    },
}

module.exports = function messagesReducer(state = initialState, action) {
    switch(action.type) {
        case types.FETCHING_ACTIVE_MESSAGE:
        case types.FETCHED_USER_LIST:
        case types.FETCHING_USER_LIST:
        case types.CHOOSE_ACTIVE_MESSAGE:
        return {
            ...state,
            ...action,
        }

        default:
        return state;
    }
}