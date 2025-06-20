import axios from 'axios';

const apiUrl = axios.create({
  baseURL: 'http://localhost:3001', // Sua URL base
  timeout: 10000, // Timeout opcional (10 segundos)
  headers: {
    'Content-Type': 'application/json',
  },
});


// api.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

apiUrl.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratar erros globais (ex: redirecionar se for 401)
    if (error.response?.status === 401) {
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiUrl;