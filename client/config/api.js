/**
* Silo
* Module define all API paths
* author: @patr
*/

const BASE_URL = '/api/';

const SOCK = 'ws://' + window.location.host + '/api/channels/';

module.exports = {
    // URLs
    MESSAGES_API: BASE_URL + 'messages/',
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
}
