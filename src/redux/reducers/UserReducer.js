import { SET_USER_INFO } from "../types/UserType";

const stateDefault = {
    userInfo: {}
}

const UserReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_USER_INFO: {
            return {...state, userInfo: {...action.userInfo}};
        }
        default: {
            return state;
        }
    }
}

export default UserReducer;