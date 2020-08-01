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
import { devToolsEnhancer } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { App } from './components';
import { rootReducer } from './stores/root/reducer';
import { init } from './api';

const history = createBrowserHistory();

export const store = createStore(
    rootReducer(history),
    devToolsEnhancer({ name: 'Temp Tracker' }),
);


init(store);

const Root = () => (
    <Provider store={store}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>
);

const render = async () => {
    ReactDOM.render(<Root />, document.getElementById('root'));
};

render();
