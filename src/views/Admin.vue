<template>
    <div class="common-layout" v-show="isShow">
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-main>
                <!-- 重置开始时间 -->
                <el-row>
                    <el-col :span="24">
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span class="span">重置开始时间</span>
                                </div>
                            </template>
                            <div class="text item">
                                <DateTimePicker @DateTime="getDateTime" />
                                <el-button type="success" :icon="Check" @click="resetDateTime" />
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <!-- 重置密码 -->
                <el-row>
                    <el-col>
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span class="span">重置密码（默认为用户学工号）</span>
                                </div>
                            </template>
                            <el-row>
                                <el-col>
                                    <div class="mt-4" style="text-align: -webkit-center">
                                        <el-input v-model="userNumber" placeholder="账号" style="max-width: 400px">
                                            <template #append>
                                                <el-button type="success" :icon="Check"
                                                    style="background-color: #bad8ac;" @click="resetPwd" />
                                            </template>
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
                <!-- 添加导师 -->
                <el-row>
                    <el-col>
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span class="span">添加导师</span>
                                </div>
                            </template>
                            <el-row>
                                <el-col :span="12">
                                    <el-upload ref="uploadRef" class="upload-demo" :auto-upload="false" accept=".xlsx"
                                        :show-file-list="false" :on-change="change">
                                        <template #trigger>
                                            <el-button type="primary">选择文件</el-button>
                                        </template>
                                        <el-button slot="trigger" type="info" :icon="Delete" @click="deletData"
                                            style="margin-left: 8px;" />
                                        <el-button type="success" :icon="Check" @click="addTeachers" />
                                        <template #tip>
                                            <div class="el-upload__tip text-red">
                                                xls、xlsx格式
                                            </div>
                                        </template>
                                    </el-upload>
                                </el-col>
                                <el-col :span="12">
                                    <span v-show="teachersArr.length!=0?true:false">{{newTeachersArr}}......</span>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
                <!-- 添加学生 -->
                <el-row>
                    <el-col>
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span class="span">添加学生</span>
                                </div>
                            </template>
                            <el-row>
                                <el-col :span="12">
                                    <el-upload ref="uploadRef" class="upload-demo" :auto-upload="false"
                                        :show-file-list="false" accept=".xlsx" :on-change="change">
                                        <template #trigger>
                                            <el-button type="primary">选择文件</el-button>
                                        </template>
                                        <el-button slot="trigger" type="info" :icon="Delete" @click="deletData"
                                            style="margin-left: 8px;" />
                                        <el-button type="success" :icon="Check" @click="addStudents" />
                                        <template #tip>
                                            <div class="el-upload__tip text-red">
                                                xls、xlsx格式
                                            </div>
                                        </template>
                                    </el-upload>
                                </el-col>
                                <el-col :span="12">
                                    <span v-show="studentsArr.length!=0?true:false">{{newStudentsArr}}......
                                    </span>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
            </el-main>
            <el-footer>
                <Footer />
            </el-footer>
            <Dialog v-model="dialogFormVisible" v-if="dialogFormVisible" @handleClose="resolveClose" @handleConfirm="resolveConfirm"/>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
    import moment from "moment";
    import { ElMessage, ElMessageBox } from 'element-plus'
    import { ref, reactive, onMounted, toRaw,nextTick} from 'vue'
    import Header from '@/components/Header.vue'
    import DateTimePicker from '@/components/DateTimePicker.vue'
    import { adminInfoStore } from '@/store/adminInfo'
    import { userInfoStore } from '@/store/userInfo'
    import { Clock, Edit, User, Check, Delete, Unlock } from '@element-plus/icons-vue'
    import * as XLSX from 'xlsx'
    import Footer from '@/components/Footer.vue'
    import Dialog from '@/components/Dialog.vue'

    let adminInfo = adminInfoStore()
    let userInfo = userInfoStore()
    let userNumber = ref('')
    let dateTime = ref('')
    let uploadArr = ref([]) as any
    let ws = ref([]) as any
    let teachersArr = ref([]) as any
    let studentsArr = ref([]) as any
    let newTeachersArr = ref([]) as any
    let newStudentsArr = ref([]) as any
    let isShow = ref(false)

    let dialogFormVisible = ref(false)

    nextTick(async ()=>{
        await userInfo.getInfo()
        await adminInfo.checkAdimin()
        if(userInfo.password!='' && userInfo.password == userInfo.uid){
            dialogFormVisible.value = true
        }
        isShow.value = true
    })

    //处理xlsx表格数据
    let change = (file, fileList) => {
        let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        let extension = testmsg === 'xls'
        let extension2 = testmsg === 'xlsx'
        if (!extension && !extension2) {
            ElMessage.error('上传文件只能是 xls、xlsx格式')
        } else {
            const upload_file = fileList[0].raw;
            const reader = new FileReader();
            reader.readAsBinaryString(new Blob([upload_file], { type: "application/vnd.ms-excel" }));
            reader.onload = ev => {
                try {
                    let f = ev.target
                    if (f) {
                        const file = f.result;
                        const workbook = XLSX.read(file, { type: "binary" });
                        const wsname = workbook.SheetNames[0];
                        ws.value = XLSX.utils.sheet_to_json(workbook.Sheets[wsname], { header: 1, defval: '#' });
                        ws.value.shift()
                        ws.value = toRaw(ws.value)
                        if (ws.value[0][3]) {
                            for (let i = 0; i < ws.value.length; i++) {
                                teachersArr.value.push({ "name": ws.value[i][2], "number": ws.value[i][1].toString(), "total": ws.value[i][3] })
                            }
                            newTeachersArr.value = teachersArr.value[0]
                        } else {
                            for (let i = 0; i < ws.value.length; i++) {
                                studentsArr.value.push({ "name": ws.value[i][2], "number": ws.value[i][1].toString() })
                            }
                            newStudentsArr.value = studentsArr.value[0]
                        }
                    }
                }
                catch (e) {
                    console.log(e);
                    return false;
                }
            }
        }
        return extension || extension2
    }

    //确认重置
    let resetPwd = () => {
        adminInfo.resetPwd(userNumber.value)
        userNumber.value = ''
    }

    //获取时间选择器中的时间
    let getDateTime = (value: string) => {
        dateTime.value = value
    }

    //重置系统开放时间
    let resetDateTime = () => {
        adminInfo.resetDate(dateTime.value)
    }

    //添加导师
    let addTeachers = () => {
        if (teachersArr.value.length != 0) {
            adminInfo.addTeachers(teachersArr.value)
            teachersArr.value = []
        } else {
            ElMessage.error('File Error!')
        }
    }

    //添加学生
    let addStudents = () => {
        if (studentsArr.value.length != 0) {
            adminInfo.addStudents(studentsArr.value)
            studentsArr.value = []
        } else {
            ElMessage.error('File Error!')
        }
    }

    //取消添加
    let cancelAdd = (value: any) => {
        if (value == 1) {
            teachersArr.value = []
        } else {
            studentsArr.value = []
        }
    }

    //删除上传文件数据
    let deletData = () => {
        teachersArr.value = []
        studentsArr.value = []
    }

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
</script>

<style scoped>
    .common-layout {
        max-width: 1000px;
        background-color: #F2F3F5;
        border: 1px solid #DCDFE6;
        margin: auto;
        border-radius: 3px;
    }

    .span {
        display: block;
        text-align: center;
        margin: 0 auto;
        font-size: x-large;
        font-family: STKaiti;
        color: #303133;
    }

    .el-col {
        border-radius: 4px;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }

    .dialog-footer button:first-child {
        margin-right: 10px;
    }

    .box-card {
        background-color: #FFFFFF;
        margin: 10px;
    }

    .card-header {
        display: block;
        margin: 0 auto;
    }
</style>