import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import UserReducer from "./reducers/UserReducer";
import ProjectReducer from "./reducers/ProjectReducer";
import DrawerReducer from "./reducers/DrawerReducer";
import ModalReducer from './reducers/ModalReducer';
import LoadingReducer from './reducers/LoadingReducer';
import ToastReducer from './reducers/ToastReducer';

const rootReducer = combineReducers({
    UserReducer,
    ProjectReducer,
    DrawerReducer,
    ModalReducer,
    LoadingReducer,
    ToastReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;