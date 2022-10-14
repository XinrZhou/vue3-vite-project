<template>
  <el-row>
    <el-col :span="24">
      <el-card class="box-card" shadow="always">
        <el-steps :active="status" align-center>
          <el-step title="Login" description="登录" :icon="HomeFilled" />
          <el-step title="Choose" description="选择导师" :icon="Pointer" />
          <el-step title="Confirm" description="最终确认" :icon="Loading" />
          <el-step title="Done" description="完成" :icon="Select" />
        </el-steps>
      </el-card>
    </el-col>
  </el-row>
  <el-row v-if="selected == 'teacher'">
    <el-col>
      <el-result icon="success" title="您已完成选择" style="margin: 10px;background-color:#FFFFFF;">
        <template #extra>
          <span class="span">
            导师：{{userInfo.user.teacherName}}老师
          </span><br>
          <span class="span font">
            请尽快联系导师确定论文题目!
          </span>
        </template>
      </el-result>
    </el-col>
  </el-row>
  <!-- 选择列表 -->
  <teacherlist v-if="selected == 'list'" @SelectStatus="getSelectStatus" />
</template>

<script lang="ts" setup>
  import moment from "moment";
  import { User } from '@/types/type'
  import { ref, onMounted, watch, defineAsyncComponent, computed } from 'vue'
  import { HomeFilled, Pointer, Loading, Select } from '@element-plus/icons-vue'
  import { userInfoStore } from '@/store/userInfo'
  import { studentInfoStore } from '@/store/studentInfo'
  import { ElMessage, ElMessageBox } from 'element-plus'

  let userInfo = userInfoStore()
  let studentInfo = studentInfoStore()
  let status = ref(2)
  let selected = ref('')
  let teacherName = ref('')

  const teacherlist = defineAsyncComponent(
    () => import('@/views/student/DataList.vue')
  )

  let user = computed(()=>userInfo.user)

  watch(user, () => {
    if (user.value?.teacherName && user.value?.teacherName?.length > 0) {
      status.value = 4
      selected.value = 'teacher'
    } else {
      selected.value = 'list'
    }
  })

  let getSelectStatus = (value:number)=>{
    status.value = value
  }

</script>

<style scoped>
  .font {
    color: #F56C6C;
    font-weight: bold;
  }
</style>