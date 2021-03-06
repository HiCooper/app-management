import axios from 'axios';
import { message } from 'antd';
import { getToken, removeAll, getRequestId, updateRequestId } from '../util/auth';

axios.defaults.baseURL = 'http://127.0.0.1:8088';
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
  const { code } = response.data;
  if (response.data.size) {
    return response;
  }
  if (code && code !== '200') {
    return Promise.reject(code);
  }
  return response;
}, (error) => {
  const { response } = error;
  if (!response) {
    message.error('系统链接超时');
  } else {
    const { status, statusText } = response;
    if (status === 403 && statusText === 'Forbidden') {
      removeAll();
      localStorage.clear();
      console.info('登陆过期,请重新登陆');
      window.location.replace(`${window.location.protocol}//${window.location.host}/#/user/login`);
    }
    message.error(`${status}, ${statusText}`);
  }
  return Promise.reject(error);
},);

export default axios;
