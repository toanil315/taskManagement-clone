import { userServices } from "../../services/UserServices";
import { TOKEN } from "../../util/constant";
import { SET_USER_INFO } from "../types/UserType";

export const loginAction = (model) => {
    return async (dispatch) => {
        try {
            const {data, status} = await userServices.login(model);
            if(status === 200) {
                const userInfo = data.content;
                localStorage.setItem(TOKEN, userInfo.accessToken);
                dispatch({
                    type: SET_USER_INFO,
                    userInfo
                })
                return true;
            }
        }
        catch(error) {
            console.log("error: ", {...error});
            return false;
        }
    }
}

export const getListUserAction = (name) => {
    return async(dispatch) => {
        try {
            const {data, status} = await userServices.getListUser(name);
            if(status === 200) {
                return data.content;
            }
        }
        catch(error) {
            console.log("error: ", {...error});
            return false;
        }
    }
}