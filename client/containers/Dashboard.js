/**
* Silo
* This is the dashboard container of the app. Handles everything for the dashboard view
* author: @patr
*/

import React from 'react';

// Redux
import { connect } from 'react-redux';

// Dashboard Components
import Sidebar from '../components/Sidebar';
import Headerbar from '../components/Headerbar';
import reactjsAdminlte from 'adminlte-reactjs';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { dashboard } = this.props;
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
                <Sidebar />
                <Headerbar />
                { this.props.children }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        dashboard: state.dashboard,
    }
}


export default connect(mapStateToProps)(Dashboard);
