import {ADD_TODO, TEXT_CHANGE} from '../constants/ActionTypes';

const initialState = '';

export default function todoText(state = initialState, action){
    switch(action.type){
        case TEXT_CHANGE:
            return action.text;
        case ADD_TODO:
            return '';
        default:
            return state;
    }
}