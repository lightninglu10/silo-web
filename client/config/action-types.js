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
    NEW_MESSAGE: 'New message',
    NEW_PARTICIPANT: 'Add a new participant to receive the message',
    ADD_MESSAGE: 'Add a message to the conversation',
    GET_MESSAGES: 'Get all messages of the conversation',
    DELETE_NEW_PARTICIPANT: 'Delete the participant',

    // User
    FACEBOOK_LOGIN_SUCCESS: 'Facebook login success',
    FACEBOOK_LOGIN_REQUEST: 'Requesting Facebook login',
    SIGNUP_COMPLETE: 'Signup completed',
    LOGOUT_COMPLETE: 'Logged out',
    SIGNUP_ERROR: 'Signup error',
    FETCHED_LOGIN: 'Login Successful',
    FETCHED_USER_INFO: 'Got user information',

    // Contact
    SAVED_CONTACT: 'Contact saved',

}
