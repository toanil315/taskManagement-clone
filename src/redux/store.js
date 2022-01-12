import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import UserReducer from "./reducers/UserReducer";
import ProjectReducer from "./reducers/ProjectReducer";
import DrawerReducer from "./reducers/DrawerReducer";
import ModalReducer from './reducers/ModalReducer';
import LoadingReducer from './reducers/LoadingReducer';

const rootReducer = combineReducers({
    UserReducer,
    ProjectReducer,
    DrawerReducer,
    ModalReducer,
    LoadingReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;