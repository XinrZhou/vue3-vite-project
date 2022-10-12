<template>
    <el-page-header title="logout" @back="userInfo.goLogout">
        <template #content>
            <div class="flex items-center" style="display: flex;justify-content: center;align-items: center;">
                <el-avatar :size="32" class="mr-3" :icon="Avatar" />
                <el-tag>{{userInfo.name}}</el-tag>
            </div>
        </template>
        <template #extra>
            <div class="flex items-center">
                <el-button type="primary" class="ml-2" @click="dialogFormVisible=true" :icon="EditPen">Edit</el-button>
            </div>
        </template>
        <Dialog v-model="dialogFormVisible" v-if="dialogFormVisible" @handleClose="cancelChange"
            @handleConfirm="resolveConfirm" />
    </el-page-header>
</template>

<script setup lang='ts'>
    import { ElMessage,ElMessageBox  } from 'element-plus'
    import { Check, Upload, Delete, Edit, ArrowLeft, Avatar } from '@element-plus/icons-vue'
    import { ref, reactive } from 'vue'
    import { userInfoStore } from '@/store/userInfo'
    import { Setting, EditPen } from '@element-plus/icons-vue'
    import Dialog from '@/components/Dialog.vue'


    let dialogVisible = ref(false)
    let activeIndex = ref('2')
    let userInfo = userInfoStore()
    let pwd1 = ref('')
    let pwd2 = ref('')

    const dialogTableVisible = ref(false)
    const dialogFormVisible = ref(false)

    let cancelChange = () => {
        dialogFormVisible.value = false
        dialogVisible.value = false
    }

    let resolveConfirm = (value: any) => {
        if (value.pwd1 != '' && value.pwd1 == value.pwd2) {
            userInfo.changePwd(value.pwd1)
        } else {
            ElMessageBox.alert('两次密码不一致，修改失败！', 'Tips', {
                confirmButtonText: 'OK',
                callback: (action: Action) => {
                    ElMessage({
                        type: 'info',
                        message: '修改失败',
                    })
                },
            })
        }
        cancelChange()
    }


</script>

<style scoped>

</style>