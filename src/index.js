import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import appReducers from './reducers';
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';
import 'todomvc-app-css/index.css';

const reducer = storage.reducer(combineReducers({
  ...appReducers
}));

const engine = createEngine('app-save-key');
const storageMiddleware = storage.createMiddleware(engine);
const createStoreWithMiddleware = applyMiddleware(storageMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);
const loadStorage = storage.createLoader(engine);
loadStorage(store)
.then((loadedState)=>{
  console.log({
    logMessage: 'Loaded State successfully',
    ...loadedState
  });
})
.catch((e)=>{
  console.log('Loading previous state failed. Show user a message apologising for losing their todos...')
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
