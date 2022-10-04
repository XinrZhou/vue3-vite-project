import { defineStore } from "pinia";
import { reqCheckAdmin, reqResetPwd, reqResetDate, reqAddTeachers, reqAddStudents } from "@/api";

export const adminInfoStore = defineStore('adminInfo', {
    actions: {
        //管理员鉴权
        async checkAdimin() {
            let result: any = await reqCheckAdmin()
        },

        //重置密码
        async resetPwd(number: string) {
            let result:any = await reqResetPwd(number)
            if(result.data.code==200){
                alert(`重置成功！`)
            }else{
                alert('重置失败')
            }
        },

        //重置系统开放时间
        async resetDate(time: string) {
            let result:any = await reqResetDate(time)
            if(result.data.code==200){
                alert(`更新成功!新时间为${time}`)
            }else{
                alert('重置失败，请求错误！')
            }
        },

        //添加导师
        async addTeachers(users: any) {
            let result:any = await reqAddTeachers(users)
            if(result.data.code==200){
                alert(`添加成功`)
            }else{
                alert('添加失败！')
            }
        },

        //添加学生
        async addStudents(users: any) {
            let result:any = await reqAddStudents(users)
            if(result.data.code==200){
                alert(`添加成功`)
            }else{
                alert('添加失败！')
            }
        }
    }
})