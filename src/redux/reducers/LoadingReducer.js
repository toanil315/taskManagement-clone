import { DISPLAY_LOADING, HIDE_LOADING } from "../types/LoadingType";

const stateDefault = {
    visible: false,
}

const LoadingReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DISPLAY_LOADING: {
            return {...state, visible: true};
        }

        case HIDE_LOADING: {
            return {...state, visible: false};
        }
    
        default:
            return state;
    }
}

export default LoadingReducer;