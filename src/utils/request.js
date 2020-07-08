/**
 * request 网络请求工具
 * 更详细的api文档: https://bigfish.alipay.com/doc/api#request
 */
import {getToken} from './authority'
import { extend } from 'umi-request';
import { notification,message } from 'antd';
import axios from 'axios';
import router from 'umi/router';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

function checkcode(status){
  if (status === 401) {
    // @HACK
    /* eslint-disable no-underscore-dangle */
    window.g_app._store.dispatch({
      type: 'login/logout',
    });
    return;
  }
  // environment should not be used
  if (status === 403) {
    router.push('/exception/403');
    return;
  }
  if (status <= 504 && status >= 500) {
    router.push('/exception/500');
    return;
  }
  if (status >= 404 && status < 422) {
    router.push('/exception/404');
  }
}

const checkStatus = response => {
  console.log('0000000000000')
  console.log(response)
  if (response.status === 299) {
    message.destroy();
    message.error('请先登录');
    // 未登录
    router.push('/user/login');
  }
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

export default function request(url, option) {
  console.log(url)
  console.log(option)
  const options = {
    ...option,
  };
  const authorized = getToken()||'';

  const defaultOptions = {
    credentials: 'include',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization':authorized
    },
  };
  const newOptions = { ...defaultOptions, ...options };
  console.log(newOptions)
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'||
    newOptions.method === 'PATCH'||
    newOptions.method === 'GET'
  ) {
    newOptions.headers = {
      ...newOptions.headers,
    };
    console.log(newOptions)
    // newOptions.data = qs.stringify(newOptions.body || newOptions.data, {
    //   allowDots: true,
    // });
    // newOptions.data = {
    //   ...newOptions.data,
    //   // timestamp: Date.parse(new Date()) / 1000,
    // };
  }

  return (
    axios(url, newOptions)
      .then(checkStatus)
      // .then(response => cachedSave(response, hashcode))
      .then(response => {
        // DELETE and 204 do not return data by default
        // using .json will report an error.
        if (newOptions.method === 'DELETE' || response.status === 204) {
          return response.data;
        }
        return response.data;
      })
      .catch(e => {
        console.log(e)
        console.log(e.name)
        const status = e.name;
        
      })
  );
}
