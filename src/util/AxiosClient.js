import axios from "axios";
import { CustomNavigate } from "../App";

const axiosClient = axios.create();

axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    if (error.response.status === 401) {
        console.log(error.response.status);
        console.log("error");
        window.location.replace("/login");
    } else {
        return Promise.reject(error);
    }
  });

export default axiosClient;