import axios from '../config';

export const LoginApi = params => axios.post('/ajax/auth/login', params )
  .then(res => res.data);
