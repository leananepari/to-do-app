import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  const tokenType = localStorage.getItem('tokenType');

  return axios.create({
    baseURL: "http://localhost:8080",
    headers: {
      Authorization: token ? `${tokenType} ${token}` : `Basic ${btoa('client:secret')}`,
    },
  });
}