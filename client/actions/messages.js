/**
* Silo
* messages actions
* author: @patr
*/

import types from '../config/action-types';
import API from '../config/api';
import Helpers from './helpers';
import Convert from '../utils/convertNumbers';

import Cookie from 'js-cookie';

function fetchingActiveMessage() {
    return {
        type: types.FETCHING_ACTIVE_MESSAGE,
        isFetchingActiveMessage: true,
    }
}

function fetchedActiveMessage(messages, name, number, message) {
    message.to.name = `${message.to.first_name} ${message.to.last_name}`.trim()
    return {
        type: types.CHOOSE_ACTIVE_MESSAGE,
        newMessage: false,
        activeMessage: {
            messages: messages,
            participants: [{
                name: name,
                number: number,
            }],
            active: message,
        }
    }
}

function fetchedMessages(messages) {
    return {
        type: types.GET_MESSAGES,
        newMessage: false,
        messages: messages,
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

function messageSent(message, status) {
    return {
        type: types.MESSAGE_SENT,
        message: message,
        status: status,
        newMessage: false,
    }
}

module.exports = {
    /***
     * Removes participants from the message. Mostly for new message
     */

     removeParticipant: function removeParticipant(number) {
        return dispatch => {
            return dispatch({
                type: types.DELETE_NEW_PARTICIPANT,
                number: number
            });
        }
     },

    /***
     * Adds participants to the message. Mostly for new message
     * If the participant already exists, then load the message,
     * Else create a new message.
     */
     addParticipant: function addParticipant(name, number) {
        // TODO: magic number
        if (number.length === 10) {
            number = "+1" + number;
        }

        return dispatch => {
            return dispatch({
                type: types.NEW_PARTICIPANT,
                participant: {
                    number: number,
                    name: name,
                }
            });
        }
     },
     newMessageCancel: function newMessageCancel() {
        return dispatch => {
            return dispatch({
                type: types.NEW_MESSAGE,
                newMessage: false,
            });
        }
     },
    /***
     * New message: alerts the message container to spring a new message field
     */
     newMessage: function newMessage() {
        return dispatch => {
            return dispatch({
                type: types.NEW_MESSAGE,
                newMessage: true,
                activeMessage: {
                    participants: [],
                    messages: [],
                    active: {
                        to: {number: null},
                    },
                },
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
                return dispatch(messageSent(json.message, json.status));
            })
            .catch((e) => {
                // TODO: handle catch
                alert(e)
            });
        }
    },

    /***
     * Add message to message list
     */
    addMessage: function addMessage(message) {
        return dispatch => {
            return dispatch({
                type: types.ADD_MESSAGE,
                message: message,
            });
        }
    },

    getMessages: function getMessages(number) {
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
            return fetch(`${API.MESSAGES_API}${number}`, config)
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                if (!json.messages)
                    debugger
                return dispatch(fetchedMessages(json.messages));
            })
            .catch((e) => {
                // TODO: handle exceptions
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
            name += ` ${message.to.last_name}`;
        }

        if (!name) {
            if (message.to.number.length === 10) {
                var number = Convert.nationalToE164(message.to.number)
            } else if (message.to.number.length === 12) {
                var number = Convert.E164toReadable(message.to.number)
            }
            name += number;
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
                return dispatch(fetchedActiveMessage(json.messages, name, message.to.number, json.messages[0]));
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