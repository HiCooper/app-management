import axios from 'axios';
import { message } from 'antd';
import { getToken, removeAll, getRequestId, updateRequestId } from '../util/auth';

axios.defaults.baseURL = 'http://192.168.2.207:8088';
axios.defaults.timeout = 5000;

axios.interceptors.request.use((config) => {
  config.headers.authorization = getToken();
  config.headers.requestId = getRequestId();
  return config;
}, (error) => {
  console.error(error);
  return Promise.reject(error);
},);

axios.interceptors.response.use((response) => {
  updateRequestId();
  const { code, msg } = response.data;
  if (response.data.size) {
    return response;
  }
  if (code && code !== '200') {
    console.error(msg);
    if (code === 'TOKEN_EXPIRED') {
      removeAll();
      localStorage.clear();
      console.info('登陆过期');
      window.location.replace(`${window.location.protocol}//${window.location.host}/#/user/login`);
    }
    return Promise.reject(code);
  }
  return response;
}, (error) => {
  message.error(`${error.response.status}, ${error.response.statusText}`);
  return Promise.reject(error);
},);

export default axios;
