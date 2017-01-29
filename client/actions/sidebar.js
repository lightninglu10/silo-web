/**
* Silo
* sidebar actions
* author: @patr
*/

import types from '../config/action-types';

module.exports = {
    changeActive: function changeActive(active) {
        return dispatch => {
            dispatch({
                type: types.CHANGE_ACTIVE,
                active: active,
            });
        }
    }
}