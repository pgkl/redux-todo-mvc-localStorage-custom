import React, { Component } from 'react';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { autoRehydrate, persistStore,  } from 'redux-persist';
import logger from 'redux-logger';
import localForage from 'localforage';

import reducer from './reducers';
import App from './containers/App';
import 'todomvc-app-css/index.css';

const store = compose(applyMiddleware(logger), autoRehydrate())(createStore)(reducer);


global.window.onerror = (msg, url, lineNo, colNo, error) => {
    console.log(error);
}

export default class AppProvider extends Component {
    constructor() {
        super();
        this.state = { rehydrated: false }
    }

    componentWillMount() {
        persistStore(store, {storage: localForage, blacklist:['todoText']}, () => {
            this.setState({ rehydrated: true });
        });
    }

    render() {
        if (!this.state.rehydrated) {
            return <div>..loading</div>;
        }
        else {
            return (
                <Provider store={store}>
                    <App />
                </Provider>);
        }
    }
}
