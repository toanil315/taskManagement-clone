import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import UserReducer from "./reducers/UserReducer";
import ProjectReducer from "./reducers/ProjectReducer";

const rootReducer = combineReducers({
    UserReducer,
    ProjectReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;