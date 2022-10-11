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
                                <DateTimePicker @DateTime="getDateTime" :time="startTime" />
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
                                <el-col :span="13">
                                    <Upload @uploadData="getUploadData" @deleteData="deleteUploadData"
                                        @confirmUpload="addUser"></Upload>
                                </el-col>
                                <el-col :span="11">
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
                                <el-col :span="13">
                                    <Upload @uploadData="getUploadData" @deleteData="deleteUploadData"
                                        @confirmUpload="addUser" />
                                </el-col>
                                <el-col :span="11">
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
            <Dialog v-model="dialogFormVisible" v-if="dialogFormVisible" @handleClose="resolveClose"
                @handleConfirm="resolveConfirm" />
        </el-container>
    </div>
</template>

<script lang="ts" setup>
    import moment from "moment";
    import { ElMessage, ElMessageBox } from 'element-plus'
    import { ref, reactive, onMounted, toRaw, nextTick } from 'vue'
    import DateTimePicker from '@/components/DateTimePicker.vue'
    import { adminInfoStore } from '@/store/adminInfo'
    import { userInfoStore } from '@/store/userInfo'
    import { Clock, Edit, User, Check, Delete, Unlock } from '@element-plus/icons-vue'
    import Header from '@/components/Header.vue'
    import Footer from '@/components/Footer.vue'
    import Dialog from '@/components/Dialog.vue'
    import Upload from '@/components/Upload.vue'

    let adminInfo = adminInfoStore()
    let userInfo = userInfoStore()
    let userNumber = ref('')
    let dateTime = ref('')
    let uploadArr = ref([]) as any
    let teachersArr = ref([]) as any
    let studentsArr = ref([]) as any
    let newTeachersArr = ref([]) as any
    let newStudentsArr = ref([]) as any
    let isShow = ref(false)
    let startTime = ref('')
    let ws = ref([]) as any

    let dialogFormVisible = ref(false)

    adminInfo.checkAdimin()
    userInfo.getInfo()

    onMounted(() => {
        if (userInfo.password != '' && userInfo.password == userInfo.uid) {
            dialogFormVisible.value = true
        }
        isShow.value = true
        startTime.value = userInfo.startTime
    })

    //获取上传数据
    let getUploadData = (value: any) => {
        ws.value = toRaw(value)
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
        if (toRaw(teachersArr.value).length != 0) {
            adminInfo.addTeachers(teachersArr.value)
            teachersArr.value = []
        } else {
            ElMessage.error('File Error!')
        }
    }

    //添加学生
    let addStudents = () => {
        if (toRaw(studentsArr.value).length != 0) {
            adminInfo.addStudents(studentsArr.value)
            studentsArr.value = []
        } else {
            ElMessage.error('File Error!')
        }
    }

    //上传
    let addUser = () => {
        console.log(newStudentsArr.value)
        if (toRaw(newStudentsArr.value).length != 0) {
            addStudents()
            console.log('/////')
        }
        if (toRaw(newTeachersArr.value).length != 0) {
            addTeachers()
            console.log('hhhhhh')
        }
    }

    //删除上传文件数据
    let deleteUploadData = () => {
        teachersArr.value = []
        studentsArr.value = []
    }

    //对话框——取消
    let resolveClose = () => {
        dialogFormVisible.value = false
    }

    //对话框——确认
    let resolveConfirm = (value: any) => {
        if (value.pwd1 != '' && value.pwd1 == value.pwd2) {
            userInfo.changePwd(value.pwd1)
        } else {
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