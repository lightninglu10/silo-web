/**
* Silo
* This is the dashboard container of the app. Handles everything for the dashboard view
* author: @patr
*/

import React from 'react';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Dashboard Components
import Sidebar from '../components/Sidebar';
import Headerbar from '../components/Headerbar';
import reactjsAdminlte from 'adminlte-reactjs';

// Actions
import UserActions from '../actions/user';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let { userActions } = this.props;
        userActions.getUserInfo()
        .then(result => {
            // TODO: figure out what to do when we get a result back
        });
    }

    render() {
        let { dashboard, user } = this.props;
        var sidebarState = '';
        if (document.body.clientWidth > 768) {
            if (dashboard.collapse) {
                sidebarState = ' sidebar-collapse';
            } else {
                sidebarState = '';
            }
        } else {
            if (!dashboard.collapse) {
                sidebarState = ' sidebar-open';
            } else {
                sidebarState = '';
            }
        }
        return (
            <div className={"dashboard skin-blue sidebar-mini" + sidebarState} style={{height: '100%'}}>
                <Sidebar email={user.email} />
                <Headerbar />
                { this.props.children }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        dashboard: state.dashboard,
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(UserActions, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
