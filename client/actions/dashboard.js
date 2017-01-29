/**
* Silo
* dashboard page actions
* author: @patr
*/

import types from '../config/action-types';

module.exports = {
    collapseSidebar: function collapseSidebar() {
        return dispatch => {
            dispatch({
                type: types.COLLAPSE_SIDEBAR,
            });
        }
    }
}