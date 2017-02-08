/**
* Silo
* Module define all API paths
* author: @patr
*/

const BASE_URL = '/api/'

module.exports = {
    MESSAGES_API: BASE_URL + 'messages/',
    FACEBOOK_LOGIN: BASE_URL + 'login/facebook/',
    LOGIN: BASE_URL + 'auth/login/',
    SIGNUP: BASE_URL + 'auth/registration/',
    USER_INFO: BASE_URL + 'user/',
}
