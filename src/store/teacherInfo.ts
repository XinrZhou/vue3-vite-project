import { defineStore } from "pinia";
import { reqGetUnSelectedStudent, reqGetStudent, reqGetAllStudent } from "@/api";

export const teacherInfoStore = defineStore('teacherInfo', {
    state: () => {
        return {
            unSelectedList: [] as any,
            studentList: [] as any,
            allStudentList: [] as any,
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
        async getStuent(){
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
            }catch(error:any){
                ElMessage.error(error.message)
            }
        }
    }
})
