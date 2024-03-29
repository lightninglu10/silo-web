import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './config/configure-store-prod';
import Root from './containers/root';

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

// Hack to be able to set toggle buttons based on path
history.listen(location => {
  $('body').attr('data-route', location.pathname);
})

import ReactGA from 'react-ga';
ReactGA.initialize('UA-92967557-1');

ReactDOM.render(
  <Provider store={store}>
    <Root className="startofapp" history={history} />
  </Provider>
  , document.getElementById('app')
)



// const history = browserHistory

// //Hack to be able to set toggle buttons based on path
// history.listen(location => {
//   $('body').attr('data-route', location.pathname);
// })

// ReactDOM.render(
//     <Main history={history} />
//     , document.getElementById('app')
// )
