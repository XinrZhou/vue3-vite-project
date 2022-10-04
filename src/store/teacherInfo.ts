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
            let result:any = await reqGetUnSelectedStudent()
            if(result.data.code == 200){
                this.unSelectedList = result.data.data.students
            }else{
                return Promise.reject(new Error('fail！'))
            }
        },
        //该导师学生名单
        async getStuent(){
            let result:any = await reqGetStudent()
            if(result.data.code == 200){
                this.studentList = result.data.data.students
            }else{
                return Promise.reject(new Error('fail！'))
            }
        },
        //所有学生名单
        async getAllStudent(){
            let result:any = await reqGetAllStudent()
            if(result.data.code == 200){
                this.allStudentList = result.data.data.students
            }else{
                return Promise.reject(new Error('fail！'))
            }
        }
    }
})
