import { Domain } from "../util/constant";
import BaseServices from "./BaseServices";

class UserServices extends BaseServices {
    login = (data) => {
        return this.postWithoutHeader(`${Domain}/Users/signin`, data);
    }

    getListUser = (name) => {
        if(name) {
            console.log(`${Domain}/Users/getUser?keyword=${name}`);
            return this.get(`${Domain}/Users/getUser?keyword=${name}`);
        }
        return this.get(`${Domain}/Users/getUser`);
    }
}

export const userServices = new UserServices();