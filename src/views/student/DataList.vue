<template>
    <el-row >
        <el-col :span="24">
            <el-card class="box-card" shadow="always">
                <el-table :data="teachers" style="width: 100%" :header-cell-style="{textAlign: 'center'}"
                    :cell-style="{ textAlign: 'center' }">
                    <el-table-column type="index" label="#" />
                    <el-table-column prop="name" label="Name" />
                    <el-table-column label="Count">
                        <template v-slot="scope">
                            <el-button type="primary" size="small" style="width:45px;">
                                {{scope.row.count}}/{{scope.row.total}}
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="Operations">
                        <template v-slot="scope">
                            <el-button :type="scope.row.total-scope.row.count==0?'warning':'success'" size="small"
                                :disabled="scope.row.total-scope.row.count==0?true:false" @click="confirmSelect(scope.row)">Choose
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
    </el-row>
</template>

<script setup lang='ts'>
    import moment from "moment";
    import { User } from '@/types/type'
    import { userInfoStore } from '@/store/userInfo'
    import { studentInfoStore } from '@/store/studentInfo'
    import { computed, watch, ref, defineEmits,toRaw } from 'vue'
    import { ElMessage, ElMessageBox } from 'element-plus'

    let userInfo = userInfoStore()
    let studentInfo = studentInfoStore()
    studentInfo.getTeacherList()
    let teachers = computed(() => studentInfo.teacherList)
    let selectTeacher = ref < User > ({})
    const emits = defineEmits(['SelectStatus'])
    let status = ref(2)

    //确认选择
    let confirmSelect = ((user: User) => {
        status.value = 3
        ElMessageBox.confirm(
            `确定选择<b><span style="color:red">${user.name}老师</span></b>为您的毕设指导教师？<br>一经选择，不可退改！`,
            'Tips',
            {
                confirmButtonText: 'Confirm',
                cancelButtonText: 'Cancel',
                type: 'warning',
                center: true,
                dangerouslyUseHTMLString: true
            }
        )
            .then(async () => {
                try {
                    if(user.id){
                        await studentInfo.selectTutor(user.id)
                        selectTeacher.value = user
                        status.value = 3
                        ElMessageBox.alert(`选择成功,您的导师为<span style="color:red">${user.name}</span>老师!`, 'Success', {
                            confirmButtonText: 'OK',
                            dangerouslyUseHTMLString: true,
                            callback: (action: any) => {
                                ElMessage({
                                    type: 'success',
                                    message: `您的导师 ${user.name}`,
                                })
                            },
                        })
                    }
                } catch (error: any) {
                    studentInfo.getTeacherList()
                    status.value = 2
                    ElMessageBox.alert(`<span style="color:red"><b>${user.name}</b></span>老师数量已满，请重新选择！`, 'Tips', {
                        confirmButtonText: 'OK',
                        dangerouslyUseHTMLString: true,
                    })
                }
            })
            .catch(() => {
                status.value = 2
                ElMessage({
                    type: 'info',
                    message: 'cancel selection',
                })
            })
    })

    watch(status, () => {
        emits('SelectStatus', status.value)
    })

</script>

<style scoped>
.box-card {
    background-color: #FFFFFF;
    margin: 10px;
  }

  .font {
    color: #F56C6C;
    font-weight: bold;
  }
</style>