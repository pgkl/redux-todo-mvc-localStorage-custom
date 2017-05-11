import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import reducer from './reducers';
import App from './containers/App';
import 'todomvc-app-css/index.css';

const persistedStoreString = localStorage.getItem('appState');
const persistedStore = persistedStoreString ? JSON.parse(persistedStoreString) : {};
const store = createStore(reducer, persistedStore, applyMiddleware(
    logger
));

//imagine this detects for browsers that aren't chrome too
const ifQuotaLimitError = (e) => {
    if (e.code && e.code === 22) {
        return true;
    }
    else {
        return false
    }
}

store.subscribe(() => {
    let s = Object.assign({}, store.getState());
    let filterList = ['todoText'];
    (async () => {
        try {
            filterList.forEach(filter => {
                delete s[filter];
            });
            localStorage.setItem('appState', JSON.stringify(s));
        }
        catch (err) {
            ifQuotaLimitError(err)
                ? console.log('Quota limit detected and intercepted. You should tell the user and/or do some other stuff. You should also think about why you\'ve hit the quota limit')
                : console.log(err);
        }
    })();
})


global.window.onerror = (msg, url, lineNo, colNo, error) => {
    console.log(error);
}



export default class AppProvider extends Component {

    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>);
    }
}
