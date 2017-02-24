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
    newMessage: null,
    activeMessage: {
        participants: [],
        messages: [],
        active: {
            to: {
                number: '',
                name: '',
                first_name: '',
                last_name: '',
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
        case types.NEW_MESSAGE_CANCEL:
        return {
            ...state,
            ...action,
        }

        case types.MESSAGE_SENT:
        return {
            ...state,
            activeMessage: {
                participants: state.activeMessage.participants,
                active: action.message,
                messages: state.activeMessage.messages,
            }
        }

        case types.CHOOSE_NEW_MESSAGE:
        return {
            ...state,
            activeMessage: {
                participants: action.participants,
                active: action.active,
                messages: state.newMessage.messages,
            }
        }

        case types.NEW_MESSAGE:
        return {
            ...state,
            ...action,
            userList: [action.newMessage.active].concat(state.userList),
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
        // TODO: make less messy... We're checking the first element in the userList and seeing if that's a new message. if it is then
        // update the object to contain the new info
        var activeParticipants = state.activeMessage.participants;
        var newMessage;

        if (state.newMessage) {
            var participants = state.newMessage.participants;
            newMessage = {
                messages: action.messages,
                participants: participants,
                active: state.newMessage.active,
            }

            if (state.userList[0].newMessage) {
                state.userList[0].to = action.messages[0].to;
                state.userList[0].to.id = 'newMessage';
                participants = state.newMessage.participants.concat([action.messages[0].to]);
                activeParticipants = state.activeMessage.participants.concat([action.messages[0].to]);
            }
        }        

        return {
            ...state,
            userList: state.userList,
            newMessage: newMessage,
            activeMessage: {
                participants: activeParticipants,
                messages: action.messages,
                active: state.activeMessage.active,
            }
        }

        case types.NEW_PARTICIPANT:
        var name = ("" + action.participant.name).replace(/\D/g, '');
        return {
            ...state,
            newMessage: {
                messages: state.newMessage.messages,
                participants: state.newMessage.participants.concat([action.participant]),
                active: {
                    to: {
                        number: action.participant.number,
                        name: action.participant.name,
                        id: 'newMessage',
                    }
                }
            },
            activeMessage: {
                participants: state.activeMessage.participants.concat([action.participant]),
                messages: state.activeMessage.messages,
                active: {
                    to: {
                        number: action.participant.number,
                        name: action.participant.name,
                        id: 'newMessage',
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