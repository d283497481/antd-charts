//@ts-ignore
import Flyio from 'flyio/dist/npm/fly';

const request = new Flyio();

// 设置请求基地址
request.config.baseURL = '/zentao';
request.config.withCredentials = true;
request.config.timeout = 10000; // 超时时间 10s

// 统一请求拦截器
const requestInterceptor = (request: { headers: any; body: any }) => {
  // 泳道标记，开发者入参优先
  request.headers = {
    'content-type': 'multipart/form-data',
  };
  // 开发者入参优先与公共默认参数
  request.body = {
    ...request.body,
  };

  return request;
};

// 统一响应拦截器
const responseInterceptor = (response: { data: any; status: any }) => {
  const { data, status } = response;
  if (status === 200) {
    return {
      ...data,
    };
  }

  return Promise.reject(data);
};

// 统一异常拦截器
const errorInterceptor = (err: any) => {
  console.log('网络异常');
  console.log(err);
};

request.interceptors.request.use(requestInterceptor);
request.interceptors.response.use(responseInterceptor, errorInterceptor);
export default request;
