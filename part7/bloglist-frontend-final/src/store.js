import notificationReducer from "./reducers/notificationReducer";
import blogsReducer from "./reducers/blogReducer";
import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension/index";
import thunk from 'redux-thunk'

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogsReducer
})

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
))

export default store