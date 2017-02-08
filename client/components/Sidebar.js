/**
* Silo
* This is the sidebar for the dashboard of the app.
* author: @patr
*/

import React from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import SidebarActions from '../actions/sidebar';
import MessageActions from '../actions/messages';


class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { dashboard, sidebarActions, sidebar, messageActions } = this.props;
        return (
            <aside className="main-sidebar">
                {/* sidebar: style can be found in sidebar.less */}
                <section className="sidebar" >
                    {/* Sidebar user panel */}
                    <div className="user-panel">
                        <div className="pull-left image">
                            <img src={this.props.userImg} className="img-circle" alt="User Image" />
                        </div>
                        <div className="pull-left info">
                            <p>{this.props.email}</p>
                        </div>
                    </div>
                    {/* send message button */}
                    <div className="send-message" style={styles.sendMessageContainer}>
                        {!dashboard.collapse
                            ?   <button className="btn bg-yellow" style={styles.sendMessage} onClick={messageActions.newMessage}>
                                    SEND MESSAGE
                                </button>
                            :   <button className="btn bg-yellow" style={[styles.sendMessage, styles.sendMessageSmall]}>
                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                </button>
                        }
                    </div>
                    {/* /.send message button */}
                    {/* sidebar menu: : style can be found in sidebar.less */}
                    <ul className="sidebar-menu">
                        <li className="header">MAIN NAVIGATION</li>
                        <li className={"treeview" + (sidebar.active === 'received' ? ' active' : '')} onClick={() => sidebarActions.changeActive('received')}>
                            <a style={styles.pageLink}>
                                <i className="fa fa-envelope-o"></i>
                                <span>Messages</span>
                                <span className="label label-primary pull-right">4</span>
                            </a>
                            <ul className="treeview-menu">
                                <li><a href="pages/layout/top-nav.html"><i className="fa fa-circle-o"></i> Top Navigation</a></li>
                            </ul>
                        </li>
                        <li className={"treeview" + (sidebar.active === 'customers' ? ' active' : '')} onClick={() => sidebarActions.changeActive('customers')}>
                            <a style={styles.pageLink}>
                                <i className="fa fa-user"></i>
                                <span>Customers</span>
                            </a>
                            <ul className="treeview-menu">
                            </ul>
                        </li>
                        
                        <li><a href="documentation/index.html"><i className="fa fa-book"></i> <span>Documentation</span></a></li>
                        <li className="header">LABELS</li>
                        <li><a href="#"><i className="fa fa-circle-o text-red"></i> <span>Important</span></a></li>
                        <li><a href="#"><i className="fa fa-circle-o text-yellow"></i> <span>Warning</span></a></li>
                        <li><a href="#"><i className="fa fa-circle-o text-aqua"></i> <span>Information</span></a></li>
                    </ul>
                </section>
                {/* /.sidebar */}
            </aside>
        );
    }
}

var styles = {
    sendMessageContainer: {
        display: 'flex',
        margin: '10px',
        marginTop: '0px',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendMessage: {
        letterSpacing: '1px',
        fontSize: '16px',
        width: '100%',
    },
    sendMessageSmall: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    pageLink: {
        cursor: 'pointer',
    }
}

function mapStateToProps(state) {
    return {
        dashboard: state.dashboard,
        sidebar: state.sidebar,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sidebarActions: bindActionCreators(SidebarActions, dispatch),
        messageActions: bindActionCreators(MessageActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
