<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="24">
            <el-card class="box-card">
              <el-steps :active="status" align-center>
                <el-step title="Login" />
                <el-step title="Choose" />
                <el-step title="Wait" />
                <el-step title="Confirm" />
              </el-steps>
            </el-card>
          </el-col>
        </el-row>
        <el-row v-if="!studentInfo.isStart">
          <el-col :sm="12" :lg="6">
            <el-result icon="info" title="系统暂未开放">
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
              <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" label="#" width="90" />
                <el-table-column prop="name" label="Name" width="240" />
                <el-table-column label="Count" width="240">
                  <template v-slot="scope">
                    <el-button type="primary" size="small">{{scope.row.total}}/{{scope.row.remaining}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="Operations" width="120">
                  <template v-slot="scope">
                    <el-button type="success" size="small" :disabled="scope.row.remaining=='0'?true:false"
                      @click="confirmSelect(scope.row.id)">Confirm</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <el-row>
          <el-col :span="24">
            <div style="text-align: center;">Design:2020-软件工程2班 周馨睿</div>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
  import moment from "moment";
  import { toRaw, ref, nextTick } from 'vue'
  import { userInfoStore } from '@/store/userInfo'
  import { studentInfoStore } from '@/store/studentInfo'
  import Header from '@/components/Header.vue'
  import { ElMessage, ElMessageBox } from 'element-plus'


  let userInfo = userInfoStore()
  let studentInfo = studentInfoStore()
  let isLoding = ref(true)
  let tableData = ref([])
  let isDisabled = ref(false)
  let status = ref(2)
  let isSelected = ref(false)

  //获取导师列表
  nextTick(async () => {
    await userInfo.getInfo()
    if(userInfo.teacherName != 'undefined'){
      isSelected.value = true
      status.value = 4
      ElMessage.success(`您已完成选择，您的导师为${userInfo.teacherName}`)
    }
    await studentInfo.getTeacherList()
    isLoding.value = false
    tableData.value = toRaw(studentInfo.teacherList)
  })


  //确认选择
  let confirmSelect = ((id: number) => {
    status.value = 3
    ElMessageBox.confirm(
      '确定选择该老师为您的导师吗？',
      'Tips',
      {
        confirmButtonText: 'Yes',
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
  div {
    max-width: 1000px;
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
</style>