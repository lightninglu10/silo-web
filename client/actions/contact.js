/**
* Silo
* contact actions
* author: @patr
*/

import types from '../config/action-types';
import API from '../config/api';
import Helpers from './helpers';
import Cookie from 'js-cookie';

module.exports = {
    optIn: function optIn(data) {
        const config = {
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'X-CSRFToken': Cookie.get('csrftoken'),
            },
        };

        return dispatch => {
            return fetch(API.OPT_IN, config)
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