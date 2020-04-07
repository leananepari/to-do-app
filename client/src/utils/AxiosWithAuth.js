import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  const tokenType = localStorage.getItem('tokenType');

  return axios.create({
    baseURL: "https://to-do-app-spring.herokuapp.com",
    headers: {
      Authorization: token ? `${tokenType} ${token}` : `Basic ${btoa('client:secret')}`,
    },
  });
}