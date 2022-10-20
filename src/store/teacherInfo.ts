import { defineStore } from "pinia";
import { ElMessage  } from 'element-plus'
import { reqGetUnSelectedStudent, reqGetStudent, reqGetAllStudent } from "@/api"
import { User } from '@/types/type'

export const teacherInfoStore = defineStore('teacherInfo', {
    state: () => {
        return {
            unSelectedList: [] as User[],
            studentList: [] as User[],
            allStudentList: [] as User[],
        }
    },
    actions: {
         //未选学生名单
         async getUnCheckedStuent(){
            try{
                let result:any = await reqGetUnSelectedStudent()
                this.unSelectedList = result.data.data.students
            }catch(error:any){
                ElMessage.error(error.message)
            }
        },

        //该导师学生名单
        async getStudent(){
            try{
                let result:any = await reqGetStudent()
                this.studentList = result.data.data.students
            }catch(error:any){
                ElMessage.error(error.message)
            }
        },

        //所有学生名单
        async getAllStudent(){
            try{
                let result:any = await reqGetAllStudent()
                this.allStudentList = result.data.data.students
                this.isOk = true
            }catch(error:any){
                ElMessage.error(error.message)
            }
        }
    }
})
