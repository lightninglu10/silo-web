import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

module.exports = combineReducers({
    // routerReducer REQUIRED
    routing: routerReducer,
    // 
    dashboard: require('./dashboard'),
    sidebar: require('./sidebar'),
    messages: require('./messages'),
    user: require('./user'),
});