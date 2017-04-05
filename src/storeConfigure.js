import thunk from 'redux-thunk';
import reducer from './reducer';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory'


export const history = createHistory();
const middleware = routerMiddleware(history);


export const store = createStore(reducer,
    compose(
    applyMiddleware(thunk),
    applyMiddleware(middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
));
