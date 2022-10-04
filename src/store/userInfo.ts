import { defineStore } from "pinia";
import { reqGetLogin,reqGetTeacherList,reqChangePwd,reqGetInfo, reqCheckAdmin } from "@/api";
import {setToken,getToken} from '@/utils/token'
import { setRole,getRole} from "@/utils/role";
import { setUid,getUid} from "@/utils/uid";
import { setPassword,getPassword} from "@/utils/password";

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
            let result:any = await reqGetLogin(User)
            if(result.status == 200 && result.headers['token']){
                setUid(User.number)
                setPassword(User.password)
                setToken(result.headers['token'])
                setRole(result.headers['role'])
                this.uid = getUid()
                this.password = getPassword()
                this.token = getToken()
                this.getInfo()
                return 'ok'
            }else{
                return Promise.reject(new Error('用户名或密码错误'))
            }
        },

        //修改密码
        async changePwd(pwd:string){
            let result:any = await reqChangePwd(pwd)
            if(result.status==200){
                alert(`您的新密码为${this.password}`)
            }else{
                return Promise.reject(new Error('修改密码失败'))
            }
            console.log(result)
        },

        //获取用户信息
        async getInfo(){
            let result:any = await reqGetInfo()
            if(result.status==200){
                localStorage.setItem('NAME',result.data.data.user.name)
                localStorage.setItem('TEACHERNAME',result.data.data.user.teacherName)
                localStorage.setItem('STARTTIME',result.data.data.starttime)
                this.startTime = localStorage.getItem('STARTTIME')||''
                this.name=localStorage.getItem('NAME')||''
                this.teacherName = localStorage.getItem('TEACHERNAME')||''
            }
        },
    }
})
