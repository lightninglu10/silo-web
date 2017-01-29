/**
* Silo
* sidebar reducer
* author: @patr
*/

import types from '../config/action-types';

const initialState = {
    active: 'received',
}

module.exports = function sidebarReducer(state = initialState, action) {
    switch(action.type) {
        case types.CHANGE_ACTIVE:
        return {
            ...state,
            ...action,
        }

        default:
        return state;
    }
}