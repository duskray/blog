import axios from 'axios';
import { Toast } from 'antd-mobile'
import qs from 'qs'

let loading = false

const q = (method = 'get', url = '', data = {}) => {
  if (!loading) {
    loading = true
    Toast.loading('加载中...', 0, null, true)
  }
  const params = method === 'get' ? 'params' : 'data';
  const p = method === 'get' ? data : qs.stringify(data, { arrayFormat: 'brackets' })
  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      [params]: p,
      withCredentials: true,
    }).then(r => {
      Toast.hide()
      loading = false
      if (r.status >= 200 && r.status < 300) {
        if (r.data.message) {
          Toast.success(r.data.message, 2, null, false)
        }
        resolve(r.data);
      } else {
        reject(r.data);
        if (r.data.message) {
          Toast.fail(r.data.message, 2, null, false)
        }
      }
    }).catch(e => {
      Toast.hide()
      loading = false
      reject(e)
      const status = e.response.status

      if (status === 401) {
        Toast.fail(e.response.data.message, 2, null, false)
        return;
      }
      if (e.response) {
        console.log(e.response)
        Toast.fail(e.response.data.message ? e.response.data.message : e.response.statusText, 2, null, false)
      } else if (e.request) {
        console.log(e.request);
        Toast.offline('网络连接失败', 2, null, false)
      } else {
        console.log('Error', e.message);
      }
    })
  })
}

const ax = {};
if (process.env.NODE_ENV === 'development') {
  ax.baseUrl = '/user/';
} else {
  ax.baseUrl = window.REACT_APP_URL;
}

ax.get = (url, data) => {
  if (url.startsWith('/')) {
    return q('get', url, data);
  } else {
    return q('get', ax.baseUrl + url, data);
  }
};
ax.post = (url, data) => q('post', ax.baseUrl + url, data);
ax.patch = (url, data) => q('patch', ax.baseUrl + url, data);
ax.put = (url, data) => q('put', ax.baseUrl + url, data);
ax.delete = (url, data) => q('delete', ax.baseUrl + url, data);
ax.all = axios.all;
ax.spread = axios.spread;

export default ax;
