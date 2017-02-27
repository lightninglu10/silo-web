/**
* Silo
* contact reducer
* author: @patr
*/

import types from '../config/action-types';


module.exports = function contactReducer(state = initialState, action) {
    switch(action.type) {
        return {
            ...state,
            ...action,
        }

        default:
        return state;
    }
}