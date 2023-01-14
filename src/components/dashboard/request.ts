import axios from 'axios';

/**
 * 配置 request 请求时的默认参数
 */
const request = axios.create({
  baseURL: '/zentao',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  withCredentials: true,
  responseType: 'json',
});

request.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  response => {
    return Promise.resolve(response);
  },
  error => {
    return Promise.reject(error);
  }
);

export default request;
