import axios from '../config';

export const ListServerApi = params => axios.get('/ajax/server/page', { params })
  .then(res => res.data);

export const DetailServerApi = params => axios.get('/ajax/server/detail', { params })
  .then(res => res.data);

export const CreateServerApi = params => axios.post('/ajax/server/create', params)
  .then(res => res.data);
