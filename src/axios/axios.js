import axios from "axios";
import Cookies from "js-cookie";

axios.defaults.baseURL = "http://localhost:8790/api/v1/";

// Set up a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    let token = Cookies.get("token-scanner");
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

export default axios;