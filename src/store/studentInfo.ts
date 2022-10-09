import { defineStore } from "pinia";
import { ElMessage, ItemProps  } from 'element-plus'
import { reqGetTeacherList, reqSelectTutor } from "@/api";
import { toRaw, ref, nextTick } from 'vue';

export const studentInfoStore = defineStore('studentInfo', {
    state: () => {
        return {
            teacherList: [] as any,
            isChecked: false,
            isLoaded: false,
            isStart:false,
            teacherName:localStorage.getItem('TEACHERNAME')||''
        }
    },
    actions: {
        //获取导师列表
        async getTeacherList(){
            try{
                let result:any = await reqGetTeacherList()
                this.isStart = true
                this.isLoaded = true
                let list = result.data.data.teachers
                this.teacherList = result.data.data.teachers
                this.teacherList.forEach((item:any)=> {
                    Object.assign(item,{remaining:`${item.total-item.count}`})
                });
            }catch(error:any){
                ElMessage.error(error.message)
            }
        },

        //选择导师
        async selectTutor(tid:number){
            try{
                let result:any = await reqSelectTutor(tid)
                localStorage.setItem('TEACHERNAME',result.data.data.user.teacherName)
                this.teacherName = localStorage.getItem('TEACHERNAME')||''
                this.isChecked = true
                ElMessage.success(`选择成功！您的导师为${this.teacherName}`)
            }catch(error:any){
                ElMessage.error(error.message)
            }
        }
    }
})
