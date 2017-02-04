/**
* Silo
* This is the Received Messages page. Handles everything for the dashboard view
* author: @patr
*/

import React from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// NPM utils
import TextareaAutosize from 'react-autosize-textarea';

// Actions
import MessagesActions from '../actions/messages';

class MessagesContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { messages, messagesActions } = this.props;
        return (
            <div className="messages-container" style={styles.messagesContainer}>
                <UserList messagesActions={messagesActions} userList={messages.userList} />
                <ActiveMessage activeMessages={messages.activeMessage} />
            </div>
        );
    }
}

class UserList extends React.Component {
    constructor(props) {
        super(props);

        this.makeActiveMessage = this.makeActiveMessage.bind(this);

        this.state = {
            active: '',
        }
    }

    makeActiveMessage(message) {
        this.props.messagesActions.chooseActiveMessage(message);
        this.setState({
            active: message.id
        });
    }

    render() {
        var userList = this.props.userList.map((message, index) => {
            var active = this.state.active == message.id ? styles.activeUserContainer : null;
            return (
                <li className="user" key={message.id} style={{...active, ...styles.userContainer}} onClick={() => this.makeActiveMessage(message)}>
                    <div className="left">
                        <div className="image">
                        </div>
                    </div>
                    <div className="top" style={styles.userContainerTop}>
                        <span className="name" style={styles.userContainerName}>
                            {message.name}
                        </span>
                        <span className="time" style={styles.userContainerTime}>
                            {message.time}
                        </span>
                    </div>
                    <div className="preview">
                        {message.message}
                    </div>
                </li>
            );
        })

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
    }

    render() {
        var messages = this.props.activeMessages.messages.map((message, index) => {
            var userSpecificStyle = message.me ? styles.myMessage : styles.theirMessage;
            var flexPosition = message.me ? styles.flexEnd : styles.flexStart;
            return (
                <li key={message.name + '_' + index} className="message-bubble" style={{...styles.messageBubble, ...flexPosition}}>
                    <span className={message.me ? 'mine' : 'theirs'} style={{...userSpecificStyle, ...styles.message}}>
                        { message.message }
                    </span>
                </li>
            );
        });
        return (
            <div className="active-message-container col-sm-5 col-md-6" style={styles.activeMessageContainer}>
                <div className="top" style={styles.messageContainerTop}>
                    <div className="to" style={styles.top}>
                        To: {this.props.activeMessages.name}
                    </div>
                </div>
                <div className="bottom" style={styles.messageContainerBottom}>
                    <ol className="messages" style={styles.messages}>
                        { messages }
                    </ol>
                </div>
                <div className="input-space" style={styles.inputSpace}>
                    <TextareaAutosize placeholder="message" type="text" className="form-control" style={styles.inputControl} />
                </div>
            </div>
        );
    }
}

var messageBorderColor = '#d3d3d3';
var inputSpaceBackground = '#f2f2f2';

var styles = {
    activeUserContainer: {
        background: '#3c8dbc',
        color: '#fff',
    },
    messageBubble: {
        marginTop: '8px',
        display: 'flex',
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
    },
    searchContainer: {
        padding: '13px 20px',
        borderBottom: '1px solid',
        borderColor: messageBorderColor,
        background: inputSpaceBackground,
    },
    inputSpace: {
        padding: '15px',
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
        padding: '20px',
    },
    messageContainerBottom: {
        borderBottom: '1px solid',
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
    },
    messagesContainer: {
        display: 'flex',
        width: '100%',
        height: 'calc(100% - 50px)',
        paddingLeft: '230px',
    }
}

function mapStateToProps(state) {
    return {
        messages: state.messages,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        messagesActions: bindActionCreators(MessagesActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer);
