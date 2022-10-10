import { defineStore } from "pinia";
import { reqGetLogin,reqGetTeacherList,reqChangePwd,reqGetInfo, reqCheckAdmin } from "@/api";
import { ElMessage } from "element-plus";

export const userInfoStore = defineStore('userInfo',{
    state:()=>{
        return {
            token:localStorage.getItem('TOKEN')||'',
            role:localStorage.getItem('ROLE')||'',
            startTime:localStorage.getItem('STARTTIME')||'',
            teacherName:localStorage.getItem('TEACHERNAME')||'',
            name:localStorage.getItem('NAME')||'',
            uid:'',
            password:''
        }
    },
    actions:{
          //登录
          async goLogin(User:any){
            try{
                let result:any = await reqGetLogin(User)
                localStorage.setItem('TOKEN',result.headers.token)
                localStorage.setItem('ROLE',result.headers.role)
                this.uid = User.number
                this.password = User.password
                this.token = localStorage.getItem('TOKEN')||''
                this.role = localStorage.getItem('ROLE')||''
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

        //退出登录
        goLogout(){
            localStorage.clear()
            location.reload()
        }
    }
})
