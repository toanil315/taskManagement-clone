import axiosClient from "../util/AxiosClient";
import { TOKEN } from "../util/constant";

class BaseServices {
    get = (url) => {
        return axiosClient({
            method: 'GET',
            url,
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem(TOKEN) || "")   
            }
        });
    }

    post = (url, data) => {
        return axiosClient({
            method: 'POST',
            url,
            data,
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem(TOKEN) || "")   
            }
        });
    }

    put = (url, data) => {
        return axiosClient({
            method: 'PUT',
            url,
            data,
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem(TOKEN) || "")   
            }
        });
    }

    delete = (url, id) => {
        return axiosClient({
            method: 'DELETE',
            url,
            headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem(TOKEN) || "")   
            }
        })
    }

    getWithoutHeader = (url) => {
        return axiosClient({
            method: 'GET',
            url,
        });
    }

    postWithoutHeader = (url, data) => {
        return axiosClient({
            method: 'POST',
            url,
            data
        });
    }
}

export default BaseServices;