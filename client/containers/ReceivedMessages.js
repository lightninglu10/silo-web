/**
* Silo
* This is the Received Messages page. Handles everything for the dashboard view
* author: @patr
*/

import React from 'react';

// Redux
import { connect } from 'react-redux';

class MessagesContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { messages } = this.props;

        return (
            <div className="messages-container">
                <MessageList messageList={messages.messageList} />
            </div>
        );
    }
}

class MessageList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var userList = messageList.map((message, index) => {
            return (
                <li className="user" key={message.name}>
                    <div className="left">
                        <div className="image">
                        </div>
                    </div>
                    <div className="top">
                        <span className="name">
                            {message.name}
                        </span>
                        <span className="time">
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
            <div className="message-list-container">
                <div className="search">

                </div>
                <ol className="message-list">
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
        var messages = this.props.messages.map((message, index) => {
            return (
                <li className={message.sent ? 'mine' : 'theirs'}>
                    { message.message }
                </li>
            );
        });
        return (
            <div className="active-message-container">
                <div className="top">
                    <div className="to">
                        To: {this.props.messages.name}
                    </div>
                </div>
                <div className="bottom">
                    <ol className="messages">
                    </ol>
                </div>
            </div>
        );
    }
}