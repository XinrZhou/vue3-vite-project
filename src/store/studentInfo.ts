import { defineStore } from "pinia"
import { User } from '@/types/type'
import { ElMessage, ElMessageBox } from 'element-plus'
import { reqGetTeacherList, reqSelectTutor } from "@/api"
import { userInfoStore } from '@/store/userInfo'

let userInfo = userInfoStore()

export const studentInfoStore = defineStore('studentInfo', {
    state: () => {
        return {
            teacherList: [] as User,
        }
    },
    actions: {
        //获取导师列表
        async getTeacherList(){
            try{
                let result:any = await reqGetTeacherList()
                this.teacherList = result.data.data.teachers
            }catch(error:any){
                ElMessageBox.alert(error.message, 'Tips', {
                    confirmButtonText: 'OK'
                  })
            }
        },

        //选择导师
        async selectTutor(tid:any){
            try{
                let result:any = await reqSelectTutor(tid)
                userInfo.user = result.data.data.user
            }catch(error:any){
                return Promise.reject(new Error(error.message))
            }
        }
    }
})
