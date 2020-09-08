import {combineReducers, createStore} from "redux";
import reducer from "./reducers/anecdoteReducer";
import notificatonReducer from "./reducers/notificationReducer";
import {composeWithDevTools} from "redux-devtools-extension/index";
import filterReducer from "./reducers/filterReducer";

const store = createStore(combineReducers({
 anecdotes: reducer,
 notification: notificatonReducer,
 filter: filterReducer
}), composeWithDevTools())

export default store