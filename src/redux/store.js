import { createStore, combineReducers } from 'redux';

import { composeDevTools } from 'redux-devtools-extension';
const reducer = combineReducers({
    todos: todosReducers
})

const store = createStore(
    reducer,

)