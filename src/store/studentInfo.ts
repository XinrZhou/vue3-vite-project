import { defineStore } from "pinia";
import { ElMessage  } from 'element-plus'
import { reqGetTeacherList, reqSelectTutor } from "@/api";

export const studentInfoStore = defineStore('studentInfo', {
    state: () => {
        return {
            teacherList: [] as any,
            isChecked: false,
            teacherName: '',
            isLoaded: false,
            isStart:false
        }
    },
    actions: {
        //获取导师列表
        async getTeacherList(){
            try{
                let result:any = await reqGetTeacherList()
                this.isStart = true
                this.isLoaded = true
                this.teacherList = result.data.data.teachers
            }catch(error:any){
                ElMessage.error(error.message)
            }
        },

        //选择导师
        async selectTutor(tid:number){
            try{
                let result:any = await reqSelectTutor(tid)
                this.teacherName = result.data.data.user.teacherName
                this.isChecked = true
                ElMessage.success('选择成功！')
            }catch(error:any){
                ElMessage.error(error.message)
            }
        }
    }
})
