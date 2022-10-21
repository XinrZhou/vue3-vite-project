<template>
  <el-page-header title="logout" @back="userInfo.goLogout">
    <template #content>
      <div class="flex items-center" style="display: flex;justify-content: center;align-items: center;">
        <el-avatar :size="32" class="mr-3" :icon="Avatar" />
        <el-tag>{{userInfo.user.name}}</el-tag>
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
  import { ref, computed } from 'vue'
  import { userInfoStore } from '@/store/userInfo'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { ArrowLeft, Avatar, EditPen } from '@element-plus/icons-vue'
  import Dialog from '@/components/Dialog.vue'
  let activeIndex = ref('2')
  let userInfo = userInfoStore()
  let user = computed(() => userInfo.user)
  const dialogFormVisible = ref(false)
  console.log(userInfo.showResetPassword)
  if (userInfo.showResetPassword) {
    dialogFormVisible.value = true
  }
  let cancelChange = () => {
    dialogFormVisible.value = false
  }
  let resolveConfirm = (value: any) => {
    if (value.pwd1 != '' && value.pwd1 == value.pwd2) {
      userInfo.changePwd(value.pwd1)
    } else {
      ElMessageBox.alert('两次密码不一致，修改失败！', 'Tips', {
        confirmButtonText: 'OK',
      })
    }
    dialogFormVisible.value = false
  }
</script>

<style scoped>
</style>