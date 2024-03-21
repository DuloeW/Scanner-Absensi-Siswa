import axios from "axios";
import Cookies from 'js-cookie';

const token = Cookies.get('token-scanner')
axios.defaults.baseURL = 'http://localhost:8790/api/v1/';
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

if (token === undefined) {
    console.log('Token not found');
}

export default axios;
