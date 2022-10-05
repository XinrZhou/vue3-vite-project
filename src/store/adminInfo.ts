import { defineStore } from "pinia";
import { ElMessage  } from 'element-plus'
import { reqCheckAdmin, reqResetPwd, reqResetDate, reqAddTeachers, reqAddStudents } from "@/api";

export const adminInfoStore = defineStore('adminInfo', {
    actions: {
        //管理员鉴权
        async checkAdimin() {
            try{
                await reqCheckAdmin()
            }catch(error:any){
                ElMessage.error(error.message)
            }
        },

        //重置密码
        async resetPwd(number: string) {
            try{
                await reqResetPwd(number)
                ElMessage.success(`重置成功！新密码为${number}`)
            }catch(error:any){
                ElMessage.error(error.message)
            }
        },

        //重置系统开放时间
        async resetDate(time: string) {
            try{
                await reqResetDate(time)
                ElMessage.success(`更新成功！新时间为${time}`)
            }catch(error:any){
                ElMessage.error(error.message)
            }
        },

        //添加导师
        async addTeachers(users: any) {
            try{
                await reqAddTeachers(users)
                ElMessage.success(`添加成功`)
            }catch(error:any){
                ElMessage.error(error.message)
            }
        },

        //添加学生
        async addStudents(users: any) {
            try{
                await reqAddStudents(users)
                ElMessage.success(`添加成功`)
            }catch(error:any){
                ElMessage.error(error.message)
            }
        }
    }
})