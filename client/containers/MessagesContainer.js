/**
* Silo
* This is the Received Messages page. Handles everything for the dashboard view
* author: @patr
*/

import React from 'react';
import ReactDOM from 'react-dom';
import Websocket from 'react-websocket';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import ContactCard from '../components/ContactCard';
import ContactImage from '../components/ContactImage';

// NPM utils
import TextareaAutosize from 'react-autosize-textarea';
import { WithContext as ReactTags } from 'react-tag-input';
import Radium from 'radium';
// import ReactTags from 'react-tag-autocomplete';

// Actions
import MessagesActions from '../actions/messages';
import UserActions from '../actions/user';

// Stylesheets
import '../stylesheets/components/AutoSuggest.scss';

// Settings
import API from '../config/api';
import Convert from '../utils/convertNumbers';

const NO_USERS = 0;
export const messageInput = 'messageInput';
const SUGGESTION_SPLIT = '-----';
const CONTACT_IMAGE_SIZE = 40;

@Radium
class MessagesContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let { messagesActions } = this.props;

        messagesActions.getUserList()
        .then(result => {

            // TODO: Handle this better. We shouldn't return if there's nothing to return.
            if (!result) {
                return;
            }

            if (result.userList.length === 0) {
                messagesActions.newMessage();
            } else {
                messagesActions.chooseActiveMessage(result.userList[0])
                .then((result) => {
                    $(`#${messageInput}`).focus();
                });
            }
        });
    }

    render() {
        let { messages, messagesActions, user, userActions } = this.props;

        return (
            <div className="messages-container" style={styles.messagesContainer}>
                <UserList
                    messagesActions={messagesActions}
                    userList={messages.userList}
                    newMessage={messages.newMessage}
                    active={messages.activeMessage.active}
                />
                <ActiveMessage
                    activeMessages={messages.activeMessage}
                    messagesActions={messagesActions}
                    newMessage={messages.newMessage}
                    contacts={user.contacts}
                    userList={messages.userList}
                />
                <ContactCard
                    first_name={messages.activeMessage.active.to.first_name}
                    last_name={messages.activeMessage.active.to.last_name}
                    email={messages.activeMessage.active.to.email}
                    name={messages.activeMessage.active.to.name ? messages.activeMessage.active.to.name : ''}
                    number={messages.activeMessage.active.to.number}
                    id={messages.activeMessage.active.to.id}
                    notes={messages.activeMessage.active.to.notes}
                    className="col-sm-3 col-md-3"
                    messagesActions={messagesActions}
                    contactActions={userActions}
                />
            </div>
        );
    }
}

class UserList extends React.Component {
    constructor(props) {
        super(props);
    }

    makeActiveMessage = (message, active) => {
        if (!active) {
            this.props.messagesActions.chooseActiveMessage(message)
            .then((result) => {
                $(`#${messageInput}`).focus();
            });
        }
    }

    render() {
        var userList = this.props.userList.map((message, index) => {
            var active = this.props.active.to.id == message.to.id ? styles.activeUserContainer : null;

            var name = '';

            if (message.to.first_name) {
                name += message.to.first_name;
            }

            if (message.to.last_name) {
                name += ` ${message.to.last_name}`;
            }

            if (!name) {
                var number = message.to.number;
                if (number.length === 10) {
                    number = Convert.nationalToE164(number)
                } else if (number.length === 12) {
                    number = Convert.E164toReadable(number)
                }
                name += number;
            }

            if (message.newMessage) {
                name = name ? `New Message to ${name}` : `New Message`;
            }

            return (
                <li className="user" key={message.id} className={this.props.active.to.id === message.to.id ? 'active' : ''} style={{...active, ...styles.userContainer}} onClick={() => this.makeActiveMessage(message, active)}>
                    <div className="left">
                        <div className="image" style={styles.image}>
                            <ContactImage
                                editContact={false}
                                image={message.to.image}
                                name={name}
                                id={message.to.id}
                                size={CONTACT_IMAGE_SIZE}
                                cardStyle={{fontSize: '1.6em'}}
                            />
                        </div>
                    </div>
                    <div className="right" style={styles.userContainerRight}>
                        <div className="top" style={styles.userContainerTop}>
                            <span className="name" style={styles.userContainerName}>
                                { name }
                            </span>
                            <span className="time" style={styles.userContainerTime}>
                                { message.time }
                            </span>
                        </div>
                        <div className="preview" style={styles.preview}>
                            { message.body }
                        </div>
                    </div>
                </li>
            );
        });

        // if (this.props.newMessage || userList.length === NO_USERS) {
        //     // TODO: figureo ut how to make active new message
        //     var newMessage = <li className="user" key="new_message" style={{...styles.activeUserContainer, ...styles.userContainer}} onClick={() => this.props.messagesActions.newMessage()}>
        //                          <div className="left">
        //                              <div className="image">
        //                              </div>
        //                          </div>
        //                          <div className="top" style={styles.userContainerTop}>
        //                              <span className="name" style={styles.userContainerName}>
                                        
        //                              </span>
        //                          </div>
        //                      </li>
        //     userList.unshift(newMessage);
        // }

        return (
            <div className="message-list-container col-sm-4 col-md-3" style={styles.messageListContainer}>
                <div className="search" style={styles.searchContainer}>
                    <input placeholder="&#xf002; Search" type="text" className="form-control" style={styles.inputControl} />
                </div>
                <ol className="user-list" style={styles.userList}>
                    { userList }
                </ol>
            </div>
        );
    }
}

class ActiveMessage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            message: '',
            suggestions: [],
            tags: [],
        }
    }

    onMessageChange = (e) => {
        this.setState({
            message: e.target.value,
        });
    }

    enterPressed = (e) => {
        if (!e.shiftKey && e.which === 13) {
            e.preventDefault();

            var numbers = ''
            this.props.activeMessages.participants.map((participant, index) => {
                numbers += participant.number + ','
            });

            var trueNumbers = numbers.substring(0, numbers.length - 1);

            // TODO: handle media url's and contact book correctly
            var data = {
                body: this.state.message,
                numbers: trueNumbers,
                contact_book: 0,
                media_url: '',
            }

            // TODO: handle send states (confirmation of send, if not then display that warning sign)
            var sentMessage = this.state.message;
            this.props.messagesActions.addMessage({'body': sentMessage, 'to': this.props.activeMessages.active.to, 'me': true});
            this.setState({
                message: '',
            });

            this.props.messagesActions.newMessageCancel();


            this.props.messagesActions.sendMessage(data)
            .then((json) => {
                // TODO: properly handle what happens after a message is sent
                if (json.status == 200) {
                    this.props.messagesActions.getUserList();
                    this.refs.sendSound.play();
                } else {
                    this.setState({
                        message: sentMessage
                    });

                    // TODO: handle this alert more gracefully
                    alert('Something happened. Try sending your message again!');
                }
            });
        }
    }

    /************************************************************
     * React Tag Input functions start
     ************************************************************/

    handleFilterSuggestions = (input, suggestions) => {
        var lowerCaseQuery = input.toLowerCase();

        return suggestions.filter(function(suggestion) {
            var num = suggestion.split(SUGGESTION_SPLIT)[1]
            var numbers = ("" + num).replace(/\D/g, '');
            return suggestion.toLowerCase().includes(lowerCaseQuery) || numbers.includes(lowerCaseQuery);
        });

        // var suggestionReturn = suggestionList.map((suggestion) => {
        //     return suggestion.name;
        // });

        // console.log(lowerCaseQuery);
        // console.log('---------------');
        // console.log(suggestionReturn);
        // return suggestionReturn;
    }

    handleDelete = (i) => {
        var tags = this.state.tags.slice(0);
        var remove = tags.splice(i, 1);
        this.setState({
            tags: tags
        });

        // TODO: finish on delete
        if (remove.length > 0) {
            this.props.messagesActions.removeParticipant(remove[0].number);
        }
    }

    handleAddition = (tag) => {
        // 10 digit USA number without the country code
        // TODO: handle people putting in the country code themselves
        if (tag.includes(SUGGESTION_SPLIT)) {
            // If it's from a suggestion, slice the country code number into 10 digit USA number
            var num = this.state.suggestionsDict[tag].number;
            var usaNumber = num.slice(2, num.length);
            var name = this.state.suggestionsDict[tag].fullName;
        } else {
            var usaNumber = tag;
        }

        var readableNumber;
        if (usaNumber.length === 10) {
            readableNumber = Convert.nationalToE164(usaNumber);
        } else {
            readableNumber = Convert.E164toReadable(usaNumber);
        }
        var tags = this.state.tags.concat({text: readableNumber});

        this.setState({
            tags: tags,
        });

        /***
        * Check to see if the message already exists. If so, load it up, else make a new one.
        */
        var existing = false;
        var contact;
        if (this.props.userList) {
            for (var i = 0; i < this.props.userList.length; i++) {
                var numb = this.props.userList[i].to.number;
                if (numb.slice(2, numb.length) === usaNumber) {
                    existing = true;
                    contact = this.props.userList[i];
                    break;
                }
            }
        }

        if (existing) {
            // If the message exists, get the previous messages
            this.props.messagesActions.getMessages(contact.to.number)
            .then((result) => {
                $(`#${messageInput}`).focus();
            });
        } else {
            if (name) {
                this.props.messagesActions.addParticipant(name, usaNumber)
            } else {
                this.props.messagesActions.addParticipant(readableNumber, usaNumber)
            }
            $(`#${messageInput}`).focus();
        }
    }

    /************************************************************
     * React Tag Input functions end
     ************************************************************/

    /************************************************************
     * Websockets functions start
     ************************************************************/
    
    sendSocketMessage = (message) => {
        // sends message to channels back-end
        const socket = this.refs.socket;
        socket.state.ws.send(JSON.stringify(message));
    }

    handleWebsocketBroadcast = (data) => {
        let result = JSON.parse(data);
        if (result.status && result.status == 'failed') {
            console.log(this.props.activeMessages);
            this.props.messagesActions.getMessages(this.props.activeMessages.active.to.number);
        } else {
            this.props.messagesActions.addMessage(result);
            this.props.messagesActions.getUserList();
            this.scrollToView();

            if (document.hidden) {
                this.refs.notificationSound.play();
            } else {
                this.refs.receiveSound.play();
            }
        }
    }

    /************************************************************
     * Websockets functions end
     ************************************************************/

    scrollToView = () => {
        // Scroll to the bottom on initialization
        const node = ReactDOM.findDOMNode(this.refs.lastMessage);
        if (node) {
            node.scrollIntoView();
        }
    }

    contactsToSuggestions = (contacts) => {
        var suggestions = [];
        for (var i = 0; i < contacts.length; i++) {
            var name = `${contacts[i].first_name} ${contacts[i].last_name} ${SUGGESTION_SPLIT} ${Convert.E164toReadable(contacts[i].number)}`
            var suggestion = {
                id: i,
                suggestion: true,
                number: contacts[i].number,
                name: name,
                fullName: `${contacts[i].first_name} ${contacts[i].last_name}`,
            }
            suggestions.push(suggestion);
        }

        return suggestions;
    }

    suggestionsDict = (contacts) => {
        var suggestionsDict = {}
        contacts.map((contact, index) => {
            var name = `${contact.first_name} ${contact.last_name} ${SUGGESTION_SPLIT} ${Convert.E164toReadable(contact.number)}`
            var suggestion = {
                id: index,
                suggestion: true,
                number: contact.number,
                name: name,
                fullName: `${contact.first_name} ${contact.last_name}`,
            }

            suggestionsDict[name] = suggestion;
        });

        this.setState({
            suggestionsDict: suggestionsDict
        });

        return suggestionsDict;
    }

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.activeMessages.participants !== this.props.activeMessages.participants) {
            var tags = [].concat(nextProps.activeMessages.participants);
            for (var i = 0; i < tags.length; i++) {
                if (tags[i].name)
                    tags[i].text = tags[i].name;
            }
            this.setState({
                tags: tags,
            });
        } else if (nextProps.contacts !== this.props.contacts) {
            var suggestions = this.contactsToSuggestions(nextProps.contacts);
            this.suggestionsDict(nextProps.contacts);

            // React tags input wants list of strings
            var suggestionReturn = suggestions.map((suggestion) => {
                return suggestion.name;
            });

            this.setState({
                suggestions: suggestionReturn,
            });
        }
    }

    componentDidMount() {
        this.scrollToView();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.activeMessages.messages.length !== this.props.activeMessages.messages.length) {
            this.scrollToView();
        }
    }

    render() {

        var messages = this.props.activeMessages.messages.map((message, index) => {
            var index_ref = message.twilio_sid;
            if (index === this.props.activeMessages.messages.length - 1) {
                index_ref = 'lastMessage';
            }
            var userSpecificStyle = message.me ? styles.myMessage : styles.theirMessage;
            var flexPosition = message.me ? styles.flexEnd : styles.flexStart;
            return (
                <li ref={index_ref} key={message.name + '_' + index} className="message-bubble" style={{...styles.messageBubble, ...flexPosition}}>
                    <span className={message.me ? 'mine' : 'theirs'} style={{...userSpecificStyle, ...styles.message}}>
                        { message.body }
                    </span>
                    {message.delivery_status === 'F'
                        ?   <i className="fa fa-exclamation-circle" aria-hidden="true" style={styles.deliveryWarning}></i>
                        :   null
                    }
                </li>
            );
        });

        if (this.props.newMessage) {
            var classNames = {};
        } else {
            var classNames = {
                tagInput: 'no-search',
            };
        }

        var name = <ReactTags
                        allowNew={true}
                        handleFilterSuggestions={this.handleFilterSuggestions}
                        key={this.props.newMessage ? 'newContact' : 'existingContact'}
                        placeholder='Add a recipient'
                        tags={this.state.tags}
                        suggestions={this.state.suggestions}
                        handleDelete={this.handleDelete}
                        handleAddition={this.handleAddition}
                        minQueryLength={1}
                        classNames={classNames}
                        autofocus={true}
                        autocomplete={true}
                    />

        return (
            <div className="active-message-container col-sm-5 col-md-6" style={styles.activeMessageContainer}>
                <audio ref='receiveSound' src='/static/sounds/receive_sound.mp3' />
                <audio ref='sendSound' src='/static/sounds/send_sound.mp3' />
                <audio ref='notificationSound' src='/static/sounds/notification.mp3' />
                <Websocket ref="socket" url={API.MESSAGES_SOCKET}
                    onMessage={this.handleWebsocketBroadcast} reconnect={true} debug={true} />
                <div className="top" style={styles.messageContainerTop}>
                    <div className="to" style={styles.top}>
                        To: { name }
                    </div>
                </div>
                <div className="bottom" style={styles.messageContainerBottom}>
                    <ol className="messages" style={styles.messages}>
                        { messages }
                    </ol>
                </div>
                <div className="input-space" style={styles.inputSpace}>
                    <TextareaAutosize
                        ref="messageInput"
                        placeholder="message"
                        type="text"
                        id={messageInput}
                        className="form-control"
                        onChange={this.onMessageChange}
                        value={this.state.message}
                        style={styles.inputControl}
                        onKeyDown={this.enterPressed} />
                </div>
            </div>
        );
    }
}

var messageBorderColor = '#d3d3d3';
var inputSpaceBackground = '#f2f2f2';

var styles = {
    preview: {
        height: '39px',
        display: 'block', /* Fallback for non-webkit */
        display: '-webkit-box',
        webkitLineClamp: 2,
        webkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    deliveryWarning: {
        fontSize: '20px',
        color: 'red',
        marginLeft: '3px',
    },
    activeUserContainer: {
        background: '#3c8dbc',
        color: '#fff',
    },
    messageBubble: {
        marginTop: '8px',
        display: 'flex',
        alignItems: 'center',
    },
    flexStart: {
        justifyContent: 'flex-start',
    },
    flexEnd: {
        justifyContent: 'flex-end',
    },
    message: {
        borderRadius: '15px',
        padding: '4px 10px',
        maxWidth: '60%'
    },
    theirMessage: {
        background: '#e5e5ea',
    },
    myMessage: {
        background: '#1eb848',
        color: '#fff',
    },
    userContainerName: {
        fontWeight: '600',
    },
    userContainerTime: {
        marginLeft: 'auto',
    },
    userContainerTop: {
        display: 'flex',
    },
    userList: {
        listStyleType: 'none',
        paddingLeft: 0,
        marginTop: 0,
        marginBottom: 0,
    },
    userContainer: {
        borderBottom: '1px solid',
        borderColor: messageBorderColor,
        padding: '10px',
        paddingLeft: '22px',
        height: '80px',
        display: 'flex',
        cursor: 'pointer',
    },
    userContainerRight: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '15px',
    },
    searchContainer: {
        padding: '16px 20px',
        borderBottom: '1px solid',
        borderColor: messageBorderColor,
        background: inputSpaceBackground,
    },
    inputSpace: {
        padding: '15px',
        height: '64px',
        background: inputSpaceBackground,
    },
    inputControl: {
        width: '100%',
        borderRadius: '6px',
        resize: 'none',
        fontFamily: 'FontAwesome, Source Sans Pro, Helvetica Neue, Helvetica, Arial, sans-serif',
    },
    activeMessageContainer: {
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
    },
    messageContainerTop: {
        borderBottom: '1px solid',
        borderColor: messageBorderColor,

    },
    top: {
        paddingTop: '28px',
        paddingLeft: '20px',
        paddingBottom: '10px',
        display: 'flex',
        alignItems: 'center',
    },
    messageContainerBottom: {
        borderBottom: '1px solid',
        height: 'calc(100% - 64px)',
        overflow: 'scroll',
        borderColor: messageBorderColor,
        flex: 1,
    },
    messages: {
        padding: '15px',
        listStyleType: 'none',
        overflowY: 'auto'
    },
    messageListContainer: {
        borderRight: '1px solid',
        borderColor: messageBorderColor,
        padding: '0px',
        overflow: 'auto',
    },
    messagesContainer: {
        display: 'flex',
        width: '100%',
        height: 'calc(100% - 50px)',
        '@media screen and (min-width: 768px)': {
            paddingLeft: '230px',
        },
    },
    image: {
        background: 'linear-gradient(to bottom, #a5aab4 0%, #888b95 100%)',
        width: CONTACT_IMAGE_SIZE + 'px',
        height: CONTACT_IMAGE_SIZE + 'px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}

function mapStateToProps(state) {
    return {
        messages: state.messages,
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        messagesActions: bindActionCreators(MessagesActions, dispatch),
        userActions: bindActionCreators(UserActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);
