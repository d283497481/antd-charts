import axios from 'axios';

/**
 * 配置 request 请求时的默认参数
 */
const request = axios.create({
  baseURL: '/zentao',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  withCredentials: false,
  responseType: 'json',
  responseEncoding: 'utf8',
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
