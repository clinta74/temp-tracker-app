import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { hot } from 'react-hot-loader';

// Bootstrap imports
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { App } from './components';
import { rootReducer } from './stores/root/reducer';
import { init } from './api';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

const history = createBrowserHistory();

export const store = createStore(
  rootReducer(history),
);


init(store);

const Root = hot(module)(() => (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
));

const render = async () => {
    ReactDOM.render(<Root />, document.getElementById('root'));
};

render();
