import { defineStore } from "pinia";
import { reqGetLogin,reqGetTeacherList,reqChangePwd,reqGetInfo, reqCheckAdmin } from "@/api";
import {setToken,getToken} from '@/utils/token'
import { setRole,getRole} from "@/utils/role";
import { setUid,getUid} from "@/utils/uid";
import { setPassword,getPassword} from "@/utils/password";
import { ElMessage } from "element-plus";

export const userInfoStore = defineStore('userInfo',{
    state:()=>{
        return {
            uid:getUid()||'',
            password:getPassword()||'',
            token:getToken()||'',
            startTime:localStorage.getItem('STARTTIME')||'',
            teacherName:localStorage.getItem('TEACHERNAME')||'',
            name:localStorage.getItem('NAME')||''
        }
    },
    actions:{
          //登录
          async goLogin(User:any){
            try{
                let result:any = await reqGetLogin(User)
                setUid(User.number)
                setPassword(User.password)
                setToken(result.headers['token'])
                setRole(result.headers['role'])
                this.uid = getUid()
                this.password = getPassword()
                this.token = getToken()
                this.getInfo()
            }catch(error:any){
                ElMessage.error(error.message)
                return Promise.reject(new Error(error.message))
            }
        },

        //修改密码
        async changePwd(pwd:string){
            try{
                let result:any = await reqChangePwd(pwd)
                ElMessage.success(`您的新密码为${pwd}`)
            }catch(error:any){
                ElMessage.error(error.message)
            }
        },

        //获取用户信息
        async getInfo(){
            try{
                let result:any = await reqGetInfo()
                localStorage.setItem('NAME',result.data.data.user.name)
                localStorage.setItem('TEACHERNAME',result.data.data.user.teacherName)
                localStorage.setItem('STARTTIME',result.data.data.starttime)
                this.startTime = localStorage.getItem('STARTTIME')||''
                this.name=localStorage.getItem('NAME')||''
                this.teacherName = localStorage.getItem('TEACHERNAME')||''
            }catch(error:any){
                ElMessage.error(error.message)
            }
        },
    }
})
