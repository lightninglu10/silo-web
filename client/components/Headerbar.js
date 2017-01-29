/**
* Silo
* This is the header bar for the dashboard of the app.
* author: @patr
*/

import React from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import DashboardActions from '../actions/dashboard';

var style = {
    logolg: {
        letterSpacing: '1px',
    }
}

class Headerbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { dashboardActions } = this.props;
        return (
            <header className="main-header">
                {/* Logo */}
                <a href="index2.html" className="logo">
                    {/* mini logo for sidebar mini 50x50 pixels */}
                    <span className="logo-mini"><b>S</b>LO</span>
                    {/* logo for regular state and mobile devices */}
                    <span className="logo-lg" style={style.logolg}><b>Silo</b>LTE</span>
                </a>
                {/* Header Navbar: style can be found in header.less */}
                <nav className="navbar navbar-static-top" role="navigation">
                    {/* Sidebar toggle button*/}
                    <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button" onClick={dashboardActions.collapseSidebar}>
                        <span className="sr-only">Toggle navigation</span>
                    </a>
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">
                            {/* Messages: style can be found in dropdown.less*/}
                            <HeaderMessages />
                            {/* Notifications: style can be found in dropdown.less */}
                            {/* <HeaderNotifications /> */}
                            {/* Tasks: style can be found in dropdown.less */}
                            {/* <HeaderTasks /> */}
                            {/* User Account: style can be found in dropdown.less */}
                            <li className="dropdown user user-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <img src="dist/img/user2-160x160.jpg" className="user-image" alt="User Image" />
                                    <span className="hidden-xs">{this.props.username}</span>
                                </a>
                                <ul className="dropdown-menu">
                                    {/* User image */}
                                    <li className="user-header">
                                        <img src="dist/img/user2-160x160.jpg" className="img-circle" alt="User Image" />
                                        <p>
                                            {this.props.username}
                                        </p>
                                    </li>
                                    {/* Menu Body */}
                                    <li className="user-body">
                                        <div className="col-xs-4 text-center">
                                            <a href="#">Followers</a>
                                        </div>
                                        <div className="col-xs-4 text-center">
                                            <a href="#">Sales</a>
                                        </div>
                                        <div className="col-xs-4 text-center">
                                            <a href="#">Friends</a>
                                        </div>
                                    </li>
                                    {/* Menu Footer */}
                                    <li className="user-footer">
                                        <div className="pull-left">
                                            <a href="#" className="btn btn-default btn-flat">Profile</a>
                                        </div>
                                        <div className="pull-right">
                                            <a href="#" className="btn btn-default btn-flat">Sign out</a>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            { /* Control Sidebar Toggle Button */}
                            <li>
                                <a href="#" data-toggle="control-sidebar"><i className="fa fa-gears"></i></a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    }
}

class HeaderMessages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
        }
    }

    render() {
        var that = this;
        var messageList = this.state.messages.map((messageDetails, iterator) => {
            return (
                <MessageItem 
                    key={iterator}
                    title={messageDetails.title}
                    displayPicture={messageDetails.displayPicture}
                    time={messageDetails.time}
                    content={messageDetails.content} />
            )
        });

        return (
            <li className="dropdown messages-menu">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                    <i className="fa fa-envelope-o"></i>
                    <span className="label label-success">{that.state.messages.length}</span>
                </a>
                <ul className="dropdown-menu">
                    <li className="header">You have {this.state.messages.length} messages</li>
                    <li>
                        {/* inner menu: contains the actual data */}
                        <div className="slimScrollDiv" >

                            <ul className="menu" >
                                {messageList}
                            </ul>
                            
                            <div className="slimScrollBar"></div>
                            <div className="slimScrollRail"></div>
                        </div>
                    </li>
                    <li className="footer"><a href="#">See All Messages</a></li>
                </ul>
            </li>
        );
    }
}

class MessageItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                {/* start message */}
                <a href="#">
                    <div className="pull-left">
                        <img src={this.props.displayPicture} className="img-circle" alt="User Image" />
                    </div>
                    <h4>
                        {this.props.title}
                        <small><i className="fa fa-clock-o"></i> {this.props.time}</small>
                    </h4>
                    <p>{this.props.content}</p>
                </a>
            </li>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dashboardActions: bindActionCreators(DashboardActions, dispatch),
    }
}

export default connect(null, mapDispatchToProps)(Headerbar)
