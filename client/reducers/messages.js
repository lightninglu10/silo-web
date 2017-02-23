/**
* Silo
* messages reducer
* author: @patr
*/

import types from '../config/action-types';

import Convert from '../utils/convertNumbers';

const initialState = {
    isFetchingUserList: false,
    userList: [],
    newMessage: false,
    activeMessage: {
        participants: [],
        messages: [],
        active: {
            to: {
                number: null,
                name: null
            },
        },
    },
}

module.exports = function messagesReducer(state = initialState, action) {
    switch(action.type) {
        case types.FETCHING_ACTIVE_MESSAGE:
        case types.FETCHED_USER_LIST:
        case types.FETCHING_USER_LIST:
        case types.CHOOSE_ACTIVE_MESSAGE:
        case types.NEW_MESSAGE:
        return {
            ...state,
            ...action,
        }

        case types.ADD_MESSAGE:
        return {
            ...state,
            activeMessage: {
                participants: state.activeMessage.participants,
                messages: state.activeMessage.messages.concat([action.message]),
                active: action.message,
            }
        }

        case types.GET_MESSAGES:
        return {
            ...state,
            activeMessage: {
                participants: state.activeMessage.participants,
                messages: action.messages,
                active: state.activeMessage.active,
            }
        }

        case types.NEW_PARTICIPANT:
        var name = ("" + action.participant.name).replace(/\D/g, '');
        return {
            ...state,
            activeMessage: {
                participants: state.activeMessage.participants.concat([action.participant]),
                messages: state.activeMessage.messages,
                active: {
                    to: {
                        number: action.participant.number,
                        name: action.participant.name,
                    }
                }
            }
        }

        case types.DELETE_NEW_PARTICIPANT:
        var participants = [].concat(state.activeMessage.participants);
        for (var i = 0; i < state.activeMessage.participants.length; i++) {
            if (state.activeMessage.participants[i].number === action.number) {
                participants.splice(i, 1);
            }
        }
        return {
            ...state,
            activeMessage: {
                participants: participants,
                messages: state.activeMessage.messages,
                active: state.activeMessage.active,
            }
        }

        default:
        return state;
    }
}