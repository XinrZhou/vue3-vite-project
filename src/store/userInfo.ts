import { defineStore } from "pinia";
import { reqGetLogin,reqGetTeacherList,reqChangePwd,reqGetInfo, reqCheckAdmin } from "@/api";
import { ElMessage } from "element-plus";

export const userInfoStore = defineStore('userInfo',{
    state:()=>{
        return {
            token:sessionStorage.getItem('TOKEN')||'',
            role:sessionStorage.getItem('ROLE')||'',
            startTime:sessionStorage.getItem('STARTTIME')||'',
            teacherName:sessionStorage.getItem('TEACHERNAME')||'',
            name:sessionStorage.getItem('NAME')||'',
            uid:'',
            password:''
        }
    },
    actions:{
          //登录
          async goLogin(User:any){
            try{
                let result:any = await reqGetLogin(User)
                sessionStorage.setItem('TOKEN',result.headers.token)
                sessionStorage.setItem('ROLE',result.headers.role)
                this.uid = User.number
                this.password = User.password
                this.token = sessionStorage.getItem('TOKEN')||''
                this.role = sessionStorage.getItem('ROLE')||''
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
                sessionStorage.setItem('NAME',result.data.data.user.name)
                sessionStorage.setItem('TEACHERNAME',result.data.data.user.teacherName)
                sessionStorage.setItem('STARTTIME',result.data.data.starttime)
                this.startTime = sessionStorage.getItem('STARTTIME')||''
                this.name=sessionStorage.getItem('NAME')||''
                this.teacherName = sessionStorage.getItem('TEACHERNAME')||''
            }catch(error:any){
                ElMessage.error(error.message)
            }
        },

        //退出登录
        goLogout(){
            sessionStorage.clear()
            location.reload()
        }
    }
})
