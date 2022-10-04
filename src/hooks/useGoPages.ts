import { useRoute,useRouter } from 'vue-router';
import {userInfoStore} from '@/store/userInfo'
import { getRole } from '@/utils/role';

export default function(){
  const router = useRouter()
  const infoStore = userInfoStore()

  // 导航路由跳转
  let goPage = (num:string)=>{
    switch(num){
      case '1':
        router.push('/home')
        break
      case '2':
        if(getRole()=='Yo87M'){
          router.push('/selectcenter/student')
        }else if(getRole()=='nU0vt'){
          router.push('/selectcenter/teacher')
        }else if(getRole()=='ppYMg'){
          router.push('/selectcenter/admin')
        }
        break
      case '3':
        router.push('/usercenter')
        break
      }
  }
  
  //跳转至登录页
  let goLogin = ()=>router.push('/login')

  //退出登录
  let goLogout = ()=>{
      localStorage.clear()
      router.push('/home')
      location.reload()
  }

  return {goPage,goLogin,goLogout}
}