import {applyMiddleware, combineReducers, createStore} from "redux";
import reducer from "./reducers/anecdoteReducer";
import notificatonReducer from "./reducers/notificationReducer";
import {composeWithDevTools} from "redux-devtools-extension/index";
import filterReducer from "./reducers/filterReducer";
import thunk from "redux-thunk";

const store = createStore(combineReducers({
 anecdotes: reducer,
 notification: notificatonReducer,
 filter: filterReducer
}), composeWithDevTools(applyMiddleware(thunk)))

export default store