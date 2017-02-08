/**
* Silo
* Module where we declare all action types (Redux stuff)
* author: @patr
*/

module.exports = {
    // Dashboard
    COLLAPSE_SIDEBAR: 'Switch dashboard state',

    // Sidebar
    CHANGE_ACTIVE: 'Switch active state',

    // Messages
    CHOOSE_ACTIVE_MESSAGE: 'Choose the active message',
    FETCHING_USER_LIST: 'Getting user list',
    FETCHED_USER_LIST: 'Got user list',
    FETCHING_ACTIVE_MESSAGE: 'Fetching active message',
    MESSAGE_SENT: 'Sent Message',

    // User
    FACEBOOK_LOGIN_SUCCESS: 'Facebook login success',
    FACEBOOK_LOGIN_REQUEST: 'Requesting Facebook login',
    SIGNUP_COMPLETE: 'Signup completed',
    LOGOUT_COMPLETE: 'Logged out',
    SIGNUP_ERROR: 'Signup error',
    FETCHED_LOGIN: 'Login Successful',
}
