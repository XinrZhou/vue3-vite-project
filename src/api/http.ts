import axios from 'axios'
import { ElMessage } from 'element-plus'
import { userInfoStore } from '@/store/userInfo'
import { getRole } from '@/utils/role'
import { getToken } from '@/utils/token'
import { getUid } from '@/utils/uid'

export const request = (options: any) => {
  return new Promise((resolve, reject) => {

    const infoStore = userInfoStore()

    const service = axios.create({
      baseURL: '/api',
      timeout: 5000
    })

    axios.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        if (response.status == 200) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      },
      error => {

        console.log(error);
      }
    )
  })
}

export default request