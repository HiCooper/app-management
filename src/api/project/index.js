import axios from '../config';

export const ListProjectApi = params => axios.get('/ajax/project/page', { params })
  .then(res => res.data);

export const DetailProjectApi = params => axios.get('/ajax/project/detail', { params })
  .then(res => res.data);

export const CreateProjectApi = params => axios.post('/ajax/project/create', params)
  .then(res => res.data);
