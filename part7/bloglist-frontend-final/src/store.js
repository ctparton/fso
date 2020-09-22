import notificationReducer from "./reducers/notificationReducer";
import blogsReducer from "./reducers/blogReducer";
import {createStore, combineReducers, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension/index";
import thunk from 'redux-thunk'
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer
})

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
))

export default store