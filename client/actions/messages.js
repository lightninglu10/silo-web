/**
* Silo
* messages actions
* author: @patr
*/

import types from '../config/action-types';
import API from '../config/api';
import Helpers from './helpers';

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
    },

    getUserList: function getUserList() {
        const config = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Cache-Control': 'no-cache',
            },
        };

        return dispatch => {
            dispatch(fetchingUserList());
            return fetch(API.USER_LIST)
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                return dispatch(fetchedUserList(json.userList));
            })
            .catch((e) => {
                // TODO: handle exceptions
            })
        }
    }
}