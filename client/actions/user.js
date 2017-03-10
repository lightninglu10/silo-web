/**
* Silo
* user actions
* author: @patr
*/

import types from '../config/action-types';
import API from '../config/api';
import Helpers from './helpers';

import Cookie from 'js-cookie';

function fetchedUserInfo(firstName, lastName, email, contacts, website) {
    return {
        type: types.FETCHED_USER_INFO,
        isFetchingLogin: false,
        isLoggedIn: true,
        firstName: firstName,
        lastName: lastName,
        email: email,
        contacts: contacts,
        website: website,
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

function getGroups(groups) {
    return {
        type: types.GET_GROUPS,
        groups: groups,
    }
}

module.exports = {
    getAllGroups: function getAllGroups() {
        return dispatch => {
            return fetch(API.GET_GROUPS, API.GET_CONFIG)
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                // TODO: save the json into redux
                return dispatch(getGroups(json.groups))
            });
        }
    },
    saveContact: function saveContact(data) {
        return dispatch => {
            return fetch(API.SAVE_CONTACT + `${data.number}/`, API.PUT_CONFIG(data))
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
        return dispatch => {
            return fetch(API.USER_INFO, API.GET_CONFIG)
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                if (json.status !== 200) {
                    // TODO: figure out what to do with failure states
                    return;
                } else {
                    // TODO: fix the user object coming in
                    return dispatch(fetchedUserInfo(json.first_name, json.last_name, json.user.email, json.contacts, json.website));
                }
            })
            .catch((e) => {
                Helpers.handleError(e);
            });
        }
    },
}