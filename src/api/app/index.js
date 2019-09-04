import axios from '../config';

export const ListAppApi = params => axios.get('/ajax/app/page', { params })
  .then(res => res.data);

export const DetailAppApi = params => axios.get('/ajax/app/detail', { params })
  .then(res => res.data);

export const CreateAppApi = params => axios.post('/ajax/app/create', params)
  .then(res => res.data);
