import { Domain } from "../util/constant";
import BaseServices from "./BaseServices";

class UserServices extends BaseServices {
    login = (data) => {
        return this.postWithoutHeader(`${Domain}/Users/signin`, data);
    }

    signup = (data) => {
        return this.postWithoutHeader(`${Domain}/Users/signup`, data);
    }

    getListUser = (name) => {
        if(name) {
            return this.get(`${Domain}/Users/getUser?keyword=${name}`);
        }
        return this.get(`${Domain}/Users/getUser`);
    }
}

export const userServices = new UserServices();