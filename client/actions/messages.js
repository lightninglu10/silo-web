/**
* Silo
* messages actions
* author: @patr
*/

import types from '../config/action-types';

module.exports = {
    chooseActiveMessage: function chooseActiveMessage(message) {
        var messages = [{message: 'Hello, its me', me: false}, {message: 'aaa, its me', me: false}, {message: 'aaa, I see you', me: true}]
        return dispatch => {
            dispatch({
                type: types.CHOOSE_ACTIVE_MESSAGE,
                activeMessage: {
                    messages: messages,
                    name: message.name,
                }
            });
        }
    }
}