import axios from 'axios'
import { ElMessage  } from 'element-plus'
import {userInfoStore} from '@/store/userInfo'
import { getRole } from '@/utils/role'
import { getToken } from '@/utils/token'
import { getUid } from '@/utils/uid'
 
export  const request =(options:any)=> {
  return new Promise((resolve, reject) => {

    const infoStore = userInfoStore()
    
    const service = axios.create({
      baseURL: '/api',
      timeout: 5000 
    })
 
    // 请求拦截器
    service.interceptors.request.use(
      (config:any) => {
        let token:string|null = getToken()
        let role:string|null = getRole()
        let uid:number|null = parseInt(getUid()) 
        if (token) config.headers['token'] = token    
        if (role)  config.headers['role'] = role     
        if (uid)  config.headers['uid'] = uid    
        return config
      },
      error => {
        console.log("出错啦", error) 
        Promise.reject(error)
      }
    )

    // 响应拦截器
    service.interceptors.response.use(
      (response:any) => {
        console.log(response)
        if(response.data.code ==200 || response.data==''){
          return response
        }else{
          return Promise.reject(new Error(response.data.message))
        }
     },
     error => {
       console.log('err' + error) 
       if(error.response.status == 400){
         ElMessage.error('错了')
       }else{
         ElMessage.error('服务器请求错误，请稍后再试')
       }
       return Promise.reject(error)
     }
   )

    // 请求处理
    service(options)
      .then((res) => {
        resolve(res)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default request
