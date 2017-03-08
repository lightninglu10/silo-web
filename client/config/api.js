/**
* Silo
* Module define all API paths
* author: @patr
*/

import Cookie from 'js-cookie';

const PRODUCTION_SITE = process.env.APP_ENV === 'production' ? 'backend.silohq.com' : 'devbackend.silohq.com';
const LOCALHOST = window.location.host === 'silo.ngrok.io' ? 'silo.ngrok.io' : 'localhost:8000'

const BASE_URL = process.env.NODE_ENV === 'production' ? ('https://' + PRODUCTION_SITE + '/api/') : ('http://' + LOCALHOST + '/api/');

const SOCK = process.env.NODE_ENV === 'production' ? ('wss://' + PRODUCTION_SITE + '/api/channels/') : ('ws://' + LOCALHOST + '/api/channels/');

module.exports = {
    // URLs
    MESSAGES_API: BASE_URL + 'messages/',
    CSRF: BASE_URL + 'csrf/',
    FACEBOOK_LOGIN: BASE_URL + 'login/facebook/',
    LOGIN: BASE_URL + 'auth/login/',
    SIGNUP: BASE_URL + 'auth/registration/',
    USER_INFO: BASE_URL + 'user/',
    SAVE_CONTACT: BASE_URL + 'contact/',
    LOGOUT: BASE_URL + 'auth/logout/',
    GET_GROUPS: BASE_URL + 'groups/',
    OPT_IN: BASE_URL + 'messages/opt/',

    // Sockets
    MESSAGES_SOCKET: SOCK + 'messages/',

    GET_CONFIG: {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    },
    POST_CONFIG: function POST_CONFIG(data) {
        console.log(Cookie.get('csrftoken'));
        return ({
            method: 'post',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookie.get('csrftoken'),
            }
        });
    },
    PUT_CONFIG: function PUT_CONFIG(data) {
        return ({
            method: 'put',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookie.get('csrftoken'),
            }
        })
    },
}
