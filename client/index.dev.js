import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './config/configure-store-dev';
import Root from './containers/root';

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

// Hack to be able to set toggle buttons based on path
history.listen(location => {
  $('body').attr('data-route', location.pathname);
})

ReactDOM.render(
  <Provider store={store}>
    <Root className="startofapp" history={history} />
  </Provider>
  , document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./containers/root', () => {
    const NextRoot = require('./containers/root').default;
    ReactDOM.render(
      <Provider store={store}>
        <NextRoot className="startofapp" history={history} />
      </Provider>,
      document.getElementById('app')
    );
  });
}



// const history = browserHistory

// //Hack to be able to set toggle buttons based on path
// history.listen(location => {
//   $('body').attr('data-route', location.pathname);
// })

// ReactDOM.render(
//     <Main history={history} />
//     , document.getElementById('app')
// )
