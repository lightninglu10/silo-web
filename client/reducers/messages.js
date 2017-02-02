/**
* Silo
* messages reducer
* author: @patr
*/

import types from '../config/action-types';

const initialState = {
    userList: [
        {name: 'Nicole DelRosso', time: 'Yesterday', message: 'Hello, it\'s me.', id: '1'},
        {name: 'a DelRosso', time: 'Yesterday', message: 'Hello, it\'s me.', id: '2'},
        {name: 'b DelRosso', time: 'Yesterday', message: 'Hello, it\'s me.', id: '3'},
        {name: 'c DelRosso', time: 'Yesterday', message: 'Hello, it\'s me.', id: '4'},
        {name: 'd DelRosso', time: 'Yesterday', message: 'Hello, it\'s me.', id: '5'}
    ],
    activeMessage: {
        messages: [],
        name: '',
    },
}

module.exports = function messagesReducer(state = initialState, action) {
    switch(action.type) {
        case types.CHOOSE_ACTIVE_MESSAGE:
        return {
            ...state,
            ...action,
        }

        default:
        return state;
    }
}