<template>
  <div class="page-heading">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <h1>选择中心</h1>
        </div>
      </div>
    </div>
  </div>

  <section class="simple-post">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <div class="section-heading">
            <h2>重置账号和密码（默认值为用户学工号）</h2>
          </div>
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">账号</label>
              <input type="email" class="form-control" v-model="userNumber" :disabled="isDisable?true:false">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">密码</label>
              <input type="email" class="form-control" v-model="userNumber" disabled>
            </div>
            <button type="button" class="btn" @click="changeBtnStatus">重置密码</button>
            <button type="button" class="btn" @click="resetPwd">确认重置</button>
          </form>
        </div>
        <div class="col-md-6">
          <figure class="figure">
            <img src="../assets/images/admin_1.jpg" class="figure-img img-fluid rounded" alt="...">
          </figure>
        </div>
      </div>
    </div>
  </section>

  <section class="simple-post">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <figure class="figure">
            <img src="../assets/images/admin_2.jpg" class="figure-img img-fluid rounded" alt="...">
          </figure>
        </div>
        <div class="col-md-6">
          <div class="section-heading">
            <h2>更新开始时间</h2>
          </div>
          <DateTimePicker @DateTime="getDateTime" />
          <button type="button" class="btn" @click="resetDateTime">确认更新</button>
        </div>
      </div>
    </div>
  </section>

  <section class="simple-post">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <div class="section-heading">
            <h2>添加导师</h2>
            <UpLoad @UploadData="getUploadData" />
          </div>
          <el-table ref="singleTable" :data="teachersArr" highlight-current-row style="width: 100%" height="200">
            <el-table-column type="index" width="80">
            </el-table-column>
            <el-table-column property="name" label="姓名" width="100">
            </el-table-column>
            <el-table-column property="number" label="工号" width="150">
            </el-table-column>
            <el-table-column property="total" label="名额" width="100">
            </el-table-column>
          </el-table>
          <button type="button" class="btn" @click="addTeachers">添加</button>
          <button type="button" class="btn" @click="cancelAdd(1)">取消</button>
        </div>
        <div class="col-md-6">
          <figure class="figure">
            <img src="../assets/images/admin_3.jpg" class="figure-img img-fluid rounded" alt="...">
          </figure>
        </div>
      </div>
    </div>
  </section>

  <section class="simple-post">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <figure class="figure">
            <img src="../assets/images/admin_4.jpg" class="figure-img img-fluid rounded" alt="...">
          </figure>
        </div>
        <div class="col-md-6">
          <div class="section-heading">
            <h2>添加学生</h2>
            <UpLoad @UploadData="getUploadData" />
          </div>
          <el-table ref="singleTable" :data="studentsArr" highlight-current-row style="width: 100%" height="200">
            <el-table-column type="index" width="80">
            </el-table-column>
            <el-table-column property="name" label="姓名" width="200">
            </el-table-column>
            <el-table-column property="number" label="学号" width="240">
            </el-table-column>
          </el-table>
          <button type="button" class="btn" @click="addStudents">添加</button>
          <button type="button" class="btn" @click="cancelAdd(2)">取消</button>
        </div>
      </div>
    </div>
  </section>

</template>

<script setup lang='ts'>
  import { ref, onMounted } from 'vue';
  import { adminInfoStore } from '@/store/adminInfo'
  import DateTimePicker from '@/components/DateTimePicker.vue'
  import UpLoad from '@/components/UpLoad.vue'
  let adminInfo = adminInfoStore()
  let userNumber = ref('')
  let isDisable = ref(true)
  let dateTime = ref('')
  let uploadArr = ref([]) as any
  let teachersArr = ref([]) as any
  let studentsArr = ref([]) as any

  onMounted(() => {
    //管理员鉴权
    adminInfo.checkAdimin()
  })

  //修改按钮状态
  let changeBtnStatus = () => {
    isDisable.value = false
  }

  //确认重置
  let resetPwd = () => {
    adminInfo.resetPwd(userNumber.value)
    userNumber.value = ''
    isDisable.value = !isDisable.value
  }

  //获取时间选择器中的时间
  let getDateTime = (value: string) => {
    dateTime.value = value
  }

  //重置系统开放时间
  let resetDateTime = () => {
    adminInfo.resetDate(dateTime.value)
  }

  //获取upload中的数据
  let getUploadData = (value: any) => {
    console.log('value',value)
    value.shift()
    uploadArr.value = value
    if (uploadArr.value[0][3]) {
      for (let i = 0; i < uploadArr.value.length; i++) {
        teachersArr.value.push({ "name": uploadArr.value[i][2], "number": uploadArr.value[i][1].toString(), "total": uploadArr.value[i][3] })
      }
    } else {
      for (let i = 0; i < uploadArr.value.length; i++) {
        studentsArr.value.push({ "name": uploadArr.value[i][2], "number": uploadArr.value[i][1].toString() })
      }
    }
  }

  //添加导师
  let addTeachers = () => {
    try{
      adminInfo.addTeachers(teachersArr.value)
      teachersArr.value = []
    }catch(error:any){
      console.log(error.message)
    }
  }

  //添加学生
  let addStudents = () => {
    try{
      adminInfo.addStudents(studentsArr.value)
      studentsArr.value = []
    }catch(error:any){
      console.log(error.message)
    }
  }

  //取消添加
  let cancelAdd = (value)=>{
    if(value == 1){
      teachersArr.value = []
    }else{
      studentsArr.value = []
    }
  }
</script>

<style scoped>
  .btn {
    background-color: rgb(182, 199, 163);
    margin: 15px;
  }

  .btn:hover {
    background-color: rgb(225, 232, 217);
  }

  /deep/ .el-button {
    height: 32px;
    color: black;
    background-color: rgb(182, 199, 163);
    border: rgb(182, 199, 163);
    border-color: rgb(182, 199, 163);
    font-size: 15px;
    margin: 15px;
  }

  /deep/ .el-button:hover {
    background-color: rgb(225, 232, 217);
  }
</style>