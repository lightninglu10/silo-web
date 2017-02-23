/**
* Silo
* user actions
* author: @patr
*/

import types from '../config/action-types';
import API from '../config/api';
import Helpers from './helpers';

import Cookie from 'js-cookie';

function fetchedUserInfo(firstName, lastName, email, contacts) {
    return {
        type: types.FETCHED_USER_INFO,
        isFetchingLogin: false,
        isLoggedIn: true,
        firstName: firstName,
        lastName: lastName,
        email: email,
        contacts: contacts,
    }
}

function savedContact(firstName, lastName, email, notes, number) {
    return {
        type: types.SAVED_CONTACT,
        firstName: firstName,
        lastName: lastName,
        email: email,
        notes: notes,
        number: number,
    }
}

module.exports = {
    saveContact: function saveContact(data) {
        const config = {
            method: 'put',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'X-CSRFToken': Cookie.get('csrftoken'),
            },
        };

        return dispatch => {
            return fetch(API.SAVE_CONTACT + `${data.number}/`, config)
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                if (json.status !== 200) {
                    // TODO: figure out what to do with failure states
                    return dispatch(savedContact(
                        json.contact.first_name,
                        json.contact.last_name,
                        json.contact.email,
                        json.contact.notes,
                        json.contact.number
                    ));
                } else {
                    return;
                }
            });
        }
    },
    getUserInfo: function getUserInfo() {
        const config = {
            method: 'get',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
        };

        return dispatch => {
            return fetch(API.USER_INFO, config)
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                if (json.status !== 200) {
                    // TODO: figure out what to do with failure states
                    return;
                } else {
                    return dispatch(fetchedUserInfo(json.first_name, json.last_name, json.email, json.contacts));
                }
            })
            .catch((e) => {
                Helpers.handleError(e);
            });
        }
    },
}