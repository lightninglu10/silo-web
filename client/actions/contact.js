/**
* Silo
* contact actions
* author: @patr
*/

import types from '../config/action-types';
import API from '../config/api';
import Helpers from './helpers';

module.exports = {
    optIn: function optIn(data) {
        return dispatch => {
            return fetch(API.OPT_IN, API.POST_CONFIG(data))
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                if (json.status === 200) {
                    return {'success': true}
                } else {
                    // TODO: figure out what to do with failure states
                    return {'error': json.error}
                }
            });
        }
    }
}