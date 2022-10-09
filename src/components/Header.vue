<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false">
        <div>
            <el-avatar shape="square" :size="66" @click="dialogVisible = true"><el-icon><Avatar /></el-icon>{{userInfo.name}} </el-avatar>
        </div>
        <div class="flex-grow" />
        <el-menu-item index="2" v-if="userInfo.role=='ppYMg'?true:false">系统中心</el-menu-item>
        <el-menu-item index="2" v-if="userInfo.role=='Yo87M'?true:false">选择中心</el-menu-item>
        <el-menu-item index="2" v-if="userInfo.role=='nU0vt'?true:false">查询中心</el-menu-item>
        <el-dialog v-model="dialogVisible" width="30%">
            <el-icon><Setting /></el-icon><span>Settings</span>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" :icon="Edit" @click="changePwd" />
                    <el-button type="primary" :icon="Delete" @click="userInfo.goLogout" />
                </span>
            </template>
        </el-dialog>
    </el-menu>
</template>

<script setup lang='ts'>
    import { ElMessage, ElMessageBox } from 'element-plus'
    import { Check, Upload, Delete, Edit } from '@element-plus/icons-vue'
    import { ref } from 'vue'
    import { userInfoStore } from '@/store/userInfo'
    import { Setting,Avatar} from '@element-plus/icons-vue'
    
    let dialogVisible = ref(false)
    let activeIndex = ref('2')
    let userInfo = userInfoStore()

    let changePwd = () => {
        dialogVisible.value = false
        ElMessageBox.prompt('Please reset your password', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
        })
            .then(({ value }) => {
                userInfo.changePwd(value)
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: 'Reset canceled',
                })
            })
    }
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
</style>