import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5149/api',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
});

export const fetchBooks = async () => {
  const response = await apiClient.get('/book');
  return response.data;
};
