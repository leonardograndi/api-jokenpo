import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { store } from './_helpers/store';

import { history } from './_helpers/history';

ReactDOM.render(
    <Provider store={store}>
        <App history={history} /> 
    </Provider>,
document.getElementById('root'));
