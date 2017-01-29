/**
* AMPLI.FI
* Place where we create the store and combine it with the reducers (Redux stuff)
* author: @bnolens
*/

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = require('../reducers');

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk)(createStore)
);

module.exports = function configure(initialState) {

  // Create the redux store and add middleware to it
  const store = createStoreWithMiddleware(rootReducer, initialState);

  //Snippet to allow hot reload to work with reducers
  if(module.hot) {
    module.hot.accept(function _() {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};