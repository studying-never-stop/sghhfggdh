import axios from "axios";

const service = axios.create({
    
    baseURL: '/api',
    url: '/api',
    timeout: 5000,
})

service.interceptors.request.use(
    (config) => {
      config.headers.Authorization = localStorage.getItem('token')
      return config
    },
    (error) => {
      return Promise.reject(new Error(error))
    }
  )
  
  service.interceptors.response.use((response) => {
    console.log(response)
    const { code, msg } = response.data
    if ( code === 0 ) {
      return msg
    } else {
      ElMessage.error(msg)
      return Promise.reject(new Error(msg))
    }
  }, error => {
    error.response && ElMessage.error(error.response.data)
    return Promise.reject(new Error(error.response.data))
  }
  )
  export default service