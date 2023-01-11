import { message } from 'antd';
import axios, { AxiosRequestConfig } from 'axios';

/**
 * 配置 request 请求时的默认参数
 */
const request = axios.create({
  baseURL: '/zentao',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  withCredentials: true,
});

request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const controller = new AbortController();
    config.signal = controller.signal;
    controller.abort();

    return config;
  },
  null,
  // @ts-ignore
  { synchronous: true }
);

request.interceptors.response.use(
  async response => {
    return response;
  },
  error => {
    const { response } = error || {};
    const { msg } = response?.data ?? {};
    msg && message.error(msg);

    return Promise.reject(response);
  }
);

export default request;
