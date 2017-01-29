/**
* Silo
* dashboard page reducer
* author: @patr
*/

import types from '../config/action-types';

const initialState = {
    collapse: false,
}

module.exports = function dashboardReducer(state = initialState, action) {
    switch(action.type) {
        case types.COLLAPSE_SIDEBAR:
        return {
            collapse: !state.collapse,
        }

        default:
        return state;
    }
}