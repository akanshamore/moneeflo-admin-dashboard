import axios from 'axios';

const api = axios.create({
  baseURL: 'https://x8ki-letl-twmt.n7.xano.io/api:WAxMY5Nt',
});

export const loginUser = async (credentials: { email: string; password: string }) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const submitFormData = async (formData: FormData) => {
  const response = await api.post('/form/submit', formData);
  return response.data;
};
