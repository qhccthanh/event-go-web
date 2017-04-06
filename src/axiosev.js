import axios from 'axios';
import {API_URL, API_URL_DEBUG} from './constants';

var axiosev = axios.create({
  // baseURL: API_URL,
  baseURL: API_URL_DEBUG,
  withCredentials:true
});
axiosev.defaults.timeout = 10000;

export default axiosev;
