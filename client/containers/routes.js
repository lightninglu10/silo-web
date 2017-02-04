/**
* Silo
* This is the routes of the app. Containers go here and containers will utilize the components.
* author: @patr
*/

import React from 'react';
import ReactDOM from 'react-dom';

// Redux
import { connect } from 'react-redux';

// Router
import { applyRouterMiddleware, Router, Route, IndexRoute, Redirect} from 'react-router';
import useScroll from 'react-router-scroll';

// Containers
import Dashboard from './Dashboard';

// Components
import MessagesContainer from '../containers/MessagesContainer';
// import SentMessages from '../components/SentMessages';
// import Customers from '../components/Customers';

class Routes extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router history={this.props.history} routes={this._routes} onUpdate={() => window.scrollTo(0, 0)}>
                <Route component={Dashboard}>
                    <Route path="/" component={MessagesContainer} />
                </Route>
            </Router>
        );
    }
}


export default connect()(Routes)