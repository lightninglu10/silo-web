/**
* Silo
* auth actions
* author: @patr
*/

import types from '../config/action-types';
import API from '../config/api';
import Helpers from './helpers';

import Cookie from 'js-cookie';
import { browserHistory } from 'react-router';

function signupSuccessful(firstName, lastName, email) {
    return {
        type: types.SIGNUP_COMPLETE,
        isFetchingLogin: false,
        isLoggedIn: true,
        firstName: firstName,
        lastName: lastName,
        email: email,
    }
}

function logoutSuccessful() {
    browserHistory.push('/login');
    return {
        type: types.LOGOUT_COMPLETE,
        isFetchingLogin: false,
        isLoggedIn: false,
        email: undefined,
        firstName: undefined,
        lastName: undefined,
    }
}

function signupError(error) {
    return {
        type: types.SIGNUP_ERROR,
        error
    }
}

function loginFetch() {
    return {
        type: types.FETCHING_LOGIN,
        isFetchingLogin: true,
    }
}

function loginSuccessful() {
    return {
        type: types.FETCHED_LOGIN,
        isFetchingLogin: false,
        isLoggedIn: true,
    }
}

function requestFacebookLogin() {
    return {
        type: types.FACEBOOK_LOGIN_REQUEST,
        isFetchingLogin: true,
        isFacebookFetching: true,
        isLoggedIn: false,
    }
}

function receiveFacebookLoginHelper(json) {
    return {
        type: types.FACEBOOK_LOGIN_SUCCESS,
        isFetchingLogin: false,
        isFacebookFetching: false,
        isLoggedIn: true
    }
}

module.exports = {
    logout: function logout() {
        const config = {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'X-CSRFToken': Cookie.get('csrftoken'),
            },
        }

        return dispatch => {
            return fetch(API.LOGOUT, config)
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                return dispatch(logoutSuccessful());
            })
        }
    },
    login: function login(data) {
        const config = {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(data),
        };

        return dispatch => {
            return fetch(API.LOGIN, config)
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                return dispatch(loginSuccessful());
            })
        }
    },
    signup: function signup(data) {
        const config = {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify(data),
        };

        return dispatch => {
            return fetch(API.SIGNUP, config)
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                return dispatch(signupSuccessful(json.first_name, json.last_name, json.email));
            })
            .catch(error => {
                // TODO: handle email signup error
                error.response.text()
                .then((text) => {
                    return dispatch(signupError(text));
                })
            })
        }

    },

    facebookLogin: function facebookLogin(facebook) {
        const config = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
            },
            body: JSON.stringify({
                'access_token': facebook.accessToken,
            }),
        };
        return dispatch => {
            dispatch(requestFacebookLogin());
            return fetch(API.FACEBOOK, config)
            .then(Helpers.checkStatus)
            .then(Helpers.parseJSON)
            .then((json) => {
                return dispatch(receiveFacebookLoginHelper());
            })
            .catch(error => {
                // TODO: handle facebook signup error
                return dispatch(loginError('Error with Facebook login (' + error + ')'));
            })
        }
    },
}