import axios from 'axios'
import Vue from 'vue'

export const instance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 3000,
  withCredentials: true
})

instance.defaults.headers.post['Content-Type'] = 'application/json'

// 错误处理
instance.interceptors.response.use(function (response) {
  return response
}, catchError)

// ajax错误处理
export function catchError (error) {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        Vue.prototype.$message({
          message: error.response.data.message || '请求参数异常',
          type: 'error'
        })
        break
      case 401:
        sessionStorage.removeItem('user')
        Vue.prototype.$message({
          message: error.response.data.message || '密码错误或账号不存在！',
          type: 'warning',
          onClose: function () {
            location.reload()
          }
        })
        break
      case 403:
        Vue.prototype.$message({
          message: error.response.data.message || '无访问权限，请联系企业管理员',
          type: 'warning'
        })
        break
      default:
        Vue.prototype.$message({
          message: error.response.data.message || '服务端异常，请联系技术支持',
          type: 'error'
        })
    }
  }
  return Promise.reject(error)
}
