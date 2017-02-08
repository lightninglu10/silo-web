/**
* Silo
* messages actions
* author: @patr
*/

import types from '../config/action-types';
import API from '../config/api';
import Helpers from './helpers';

import Cookie from 'js-cookie';

function fetchingActiveMessage() {
    return {
        type: types.FETCHING_ACTIVE_MESSAGE,
        isFetchingActiveMessage: true,
    }
}

function fetchedActiveMessage(messages, name, number) {
    return {
        type: types.CHOOSE_ACTIVE_MESSAGE,
        activeMessage: {
            messages: messages,
            name: name,
            number: number,
        }
    }
}

function fetchingUserList() {
    return {
        type: types.FETCHING_USER_LIST,
        isFetchingUserList: true,
    }
}

function fetchedUserList(userList) {
    return {
        type: types.FETCHED_USER_LIST,
        isFetchingUserList: false,
        userList: userList,
    }
}

function messageSent(message) {
    return {
        type: types.MESSAGE_SENT,
        message: message,
    }
}

module.exports = {
    /***
     * New message: alerts the message container to spring a new message field
     */
     newMessage: function newMessage() {
        return dispatch => {
            return dispatch({
                type: types.NEW_MESSAGE,
                newMessage: true,
            });
        }
     },
    /***
     * Sends the message to specified data
     */
    sendMessage: function sendMessage(data) {
        const config = {
            method: 'post',
            credentials: 'include',
            headers: {
                'Cache-Control': 'no-cache',
                'X-CSRFToken': Cookie.get('csrftoken'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        };

        return dispatch => {
            return fetch(API.MESSAGES_API, config)
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                return dispatch(messageSent(json));
            })
            .catch((e) => {
                // TODO: handle catch
                alert(e)
            });
        }
    },

    /***
     * Chooses the active message
     */
    chooseActiveMessage: function chooseActiveMessage(message) {
        var name = '';

        if (message.to.first_name) {
            name += message.to.first_name;
        }

        if (message.to.last_name) {
            name += message.to.last_name;
        }

        if (!name) {
            name += message.to.number;
        }

        const config = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
        };

        return dispatch => {
            dispatch(fetchingActiveMessage());
            return fetch(`${API.MESSAGES_API}${message.to.number}`, config)
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                return dispatch(fetchedActiveMessage(json.messages, name, message.to.number));
            })
            .catch((e) => {
                // TODO: handle exceptions
            });
        }
    },

    /***
     * Gets the list of users
     */
    getUserList: function getUserList() {
        
        const config = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
        };

        return dispatch => {
            dispatch(fetchingUserList());
            return fetch(API.MESSAGES_API, config)
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                return dispatch(fetchedUserList(json.userList));
            })
            .catch((e) => {
                // TODO: handle exceptions
            });
        }
    }
}