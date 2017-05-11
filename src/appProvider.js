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

store.subscribe(()=>{
    let s = Object.assign({},store.getState());
    let filterList = ['todoText'];
    (async () => {
        try{
            filterList.forEach(filter => {
                delete s[filter];
            });
            localStorage.setItem('appState', JSON.stringify(s));
        }
        catch(err){
            console.log({
                message: 'There was an error setting local storage',
                err
            });
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
