import axios from 'axios'

// export function request(config) {
//   return new Promise((resolve,reject) => {
//     const  instance=axios.create({
//       baseURL:'http://106.54.54.237:8000/api/v1',
//       timeout:10000
//     })
//     instance(config)
//       .then( res => {
//         resolve(res)
//       })
//       .catch( err => {
//         reject(err)
//       })
//   })
// }

export function request(config) {
  const  instance=axios.create({
    baseURL:'http://106.54.54.237:8000/api/hy',
    // baseURL:'http://123.207.32.32:8000/api/hy',
    timeout:20000
  })
  //请求拦截
  instance.interceptors.request.use(function (config) {
    return config
  },function (error) {
    return Promise.reject(error)
  })
  //响应拦截
  instance.interceptors.response.use(function (res) {
    return res
  },function (err) {
    return Promise.reject(err)
  })

  return instance(config)//返回值是一个Promise
}




// const instanceelm=axios.create({
//   baseURL:'http://elm.cangdu.org',
//   timeout:10000
// })
