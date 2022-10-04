import { defineStore } from "pinia";
import { reqGetTeacherList, reqSelectTutor } from "@/api";

export const studentInfoStore = defineStore('studentInfo', {
    state: () => {
        return {
            teacherList: [] as any,
            isChecked: false,
            teacherName: '',
            isLoaded: false
        }
    },
    actions: {
        //获取导师列表
        async getTeacherList(){
            let result:any = await reqGetTeacherList()
            if(result.status == 200){
                this.isLoaded = true
                this.teacherList = result.data.data.teachers
                return 'ok'
            }else{
                return Promise.reject(new Error('fail！'))
            }
        },

        //选择导师
        async selectTutor(tid:number){
            let result:any = await reqSelectTutor(tid)
            if(result.data.code == 200){
                this.teacherName = result.data.data.user.teacherName
                this.isChecked = true
                return 'ok'
            }else{
                return Promise.reject(new Error('导师不可重复选择'))
            }
        }
    }
})
