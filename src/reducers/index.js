import { combineReducers } from 'redux'
import todos from './todos'
import todoText from './todoText';

const rootReducer = combineReducers({
  todos,
  todoText
});

export default rootReducer
