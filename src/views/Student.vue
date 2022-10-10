<template>
  <div class="common-layout"  v-if="isShow">
    <el-container>
      <el-header >
        <Header/>
      </el-header>
      <el-main style="margin: 10px;background-color: #F2F3F5;">
        <el-row>
          <el-col :span="24">
            <el-card class="box-card">
              <el-steps :active="status" align-center>
                <el-step title="Login" description="登录" :icon="HomeFilled"/>
                <el-step title="Choose" description="选择导师" :icon="Pointer" />
                <el-step title="Confirm" description="信息确认" :icon="Loading" />
                <el-step title="Submit" description="提交" :icon="Select" />
              </el-steps>
            </el-card>
          </el-col>
        </el-row>
        <el-row v-if="!studentInfo.isStart">
          <el-col >
            <el-result icon="info" title="系统暂未开放"  style="margin: auto;">
              <template #sub-title>
                <p>开始时间</p>
              </template>
              <template #extra>
                <span class="span" >
                  {{moment(userInfo.startTime).format("YYYY-MM-DD HH:mm:ss") }}
              </span>
              </template>
            </el-result>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" v-if="studentInfo.isStart&&!isSelected">
            <el-card class="box-card">
              <el-table :data="tableData" style="width: 100%"
              :header-cell-style="{textAlign: 'center'}"
              :cell-style="{ textAlign: 'center' }"
              >
                <el-table-column type="index" label="#"  />
                <el-table-column prop="name" label="Name"  />
                <el-table-column label="Count" >
                  <template v-slot="scope">
                    <el-button type="primary" size="small">{{scope.row.count}}/{{scope.row.total}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="Operations">
                  <template v-slot="scope">
                    <el-button type="success" size="small" :disabled="scope.row.remaining=='0'?true:false"
                      @click="confirmSelect(scope.row.id)">Choose</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
    <Dialog v-model="dialogFormVisible" v-if="dialogFormVisible" @handleClose="resolveClose" @handleConfirm="resolveConfirm"/>
  </div>
</template>

<script lang="ts" setup>
  import moment from "moment";
  import { toRaw, ref,onMounted,nextTick,getCurrentInstance} from 'vue'
  import { HomeFilled, Pointer,Loading,Select } from '@element-plus/icons-vue'
  import { userInfoStore } from '@/store/userInfo'
  import { studentInfoStore } from '@/store/studentInfo'
  import Header from '@/components/Header.vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import Footer from '@/components/Footer.vue'
  import Dialog from '@/components/Dialog.vue'
  
  let dialogFormVisible = ref(false)

  let userInfo = userInfoStore()
  let studentInfo = studentInfoStore()
  let tableData = ref([])
  let isDisabled = ref(false)
  let status = ref(2)
  let isSelected = ref(false)
  let teacherName = ref('')
  let isShow = ref(false)
  let  { proxy } =getCurrentInstance()


   //获取导师列表
   nextTick(async () => {
    await userInfo.getInfo()
    if(userInfo.password!='' && userInfo.password == userInfo.uid){
      dialogFormVisible.value = true
    }
    if(userInfo.teacherName != 'undefined'){
      isSelected.value = true
      status.value = 4
      ElMessage.success(`您已完成选择，您的导师为${userInfo.teacherName}`)
    }
    await studentInfo.getTeacherList()
    tableData.value = toRaw(studentInfo.teacherList)
    isShow.value = true
  })

  let resolveClose = ()=>{
    dialogFormVisible.value = false
  }

  let resolveConfirm = (value:any)=>{
    if(value.pwd1!='' && value.pwd1 == value.pwd2){
      userInfo.changePwd(value.pwd1)
    }else{
      ElMessage.error('The two passwords do not match!')
    }
    dialogFormVisible.value = false
  }


  //确认选择
  let confirmSelect = ((id: number) => {
    status.value = 3
    ElMessageBox.confirm(
      '确定选择该老师为您的导师吗？',
      'Tips',
      {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning',
      }
    )
      .then(async() => {
        await studentInfo.selectTutor(id)
        isSelected.value = true
        status.value = 4
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消选择',
        })
        status.value = 2
      })
  })

</script>

<style scoped >
  .common-layout {
        max-width: 1000px;
        background-color: #F2F3F5;
        border: 1px solid #DCDFE6;
        margin: auto;
    }

  .span {
    display: inline-block;
    margin: 10px;
  }

  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .box-card {
      background-color: #FFFFFF;
      margin: 10px;
    }

</style>