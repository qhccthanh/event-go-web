import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {store} from './storeConfigure';
import App from './components/App';


const container = document.getElementById('root');

ReactDOM.render (
    <Provider store={store}>
        <App/>
    </Provider>,
    container
);