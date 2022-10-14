<template>
    <el-row>
        <el-col :span="24">
            <el-card class="box-card">
                <div class="text item">
                    <el-tabs tab-position="top" style="height: 500px" class="demo-tabs">
                        <el-tab-pane style=" margin-top: 15%;" :icon="Clock">
                            <template #label>
                                <span class="custom-tabs-label">
                                  <el-icon><Clock /></el-icon>
                                  <span>重置开始时间</span>
                                </span>
                                </template>
                            <div class="text item ">
                                <DateTimePicker @DateTime="getDateTime" :time="startTime" />
                                <div style="text-align: center;">
                                    <el-button type="success" :icon="Check" @click="resetDateTime" />
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane style=" margin-top: 15%;">
                            <template #label>
                                <span class="custom-tabs-label">
                                  <el-icon><Setting /></el-icon>
                                  <span>重置密码</span>
                                </span>
                                </template>
                            <el-row>
                                <el-col>
                                    <div>
                                        <span class="span">重置密码（默认为用户学工号）</span>
                                        <el-row>
                                            <el-col>
                                                <div class="mt-4" style="text-align: -webkit-center">
                                                    <el-input v-model="userNumber" placeholder="账号"
                                                        style="max-width: 400px">
                                                        <template #append>
                                                            <el-button type="success" :icon="Check"
                                                                style="background-color: #bad8ac;"
                                                                @click="resetPwd" />
                                                        </template>
                                                    </el-input>
                                                </div>
                                            </el-col>
                                        </el-row>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane style=" margin-top: 15%;">
                            <template #label>
                                <span class="custom-tabs-label">
                                  <el-icon><Avatar /></el-icon>
                                  <span>添加老师</span>
                                </span>
                                </template>
                            <el-row >
                                <el-col class="addUser">
                                    <div>
                                        <span class="span">添加老师</span>
                                        <el-row>
                                            <div style="margin: -webkit-center;">
                                                <el-col >
                                                    <Upload @uploadData="getUploadData"
                                                        @deleteData="deleteUploadData"
                                                        @confirmUpload="addUser" :isUpload="isUpload">
                                                    </Upload><br>
                                                    <span
                                                        v-show="teachersArr.length!=0?true:false">{{newTeachersArr}}......</span>
                                                </el-col>          
                                            </div>
                                        </el-row>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane style=" margin-top: 15%;">
                            <template #label>
                                <span class="custom-tabs-label">
                                  <el-icon><UserFilled /></el-icon>
                                  <span>添加学生</span>
                                </span>
                                </template>
                            <el-row>
                                <el-col class="addUser">
                                    <div>
                                        <span class="span">添加学生</span>
                                        <el-row>
                                            <div style="margin: -webkit-center;">
                                                <el-col >
                                                    <Upload @uploadData="getUploadData"
                                                        @deleteData="deleteUploadData"
                                                        @confirmUpload="addUser" :isUpload="isUpload">
                                                    </Upload><br>
                                                    <span
                                                    v-show="studentsArr.length!=0?true:false">{{newStudentsArr}}......
                                                    </span>
                                                </el-col>
                                            </div>
                                        </el-row>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
    import moment from "moment";
    import { User } from '@/types/type'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import { ref, reactive, onMounted, toRaw, computed } from 'vue'
    import DateTimePicker from '@/components/DateTimePicker.vue'
    import { adminInfoStore } from '@/store/adminInfo'
    import { userInfoStore } from '@/store/userInfo'
    import { Clock,  Check,Setting,Avatar,UserFilled  } from '@element-plus/icons-vue'
    import Upload from '@/components/Upload.vue'

    let adminInfo = adminInfoStore()
    let userInfo = userInfoStore()
    let userNumber = ref('')
    let dateTime = ref('')
    let uploadArr = ref([]) as any
    let teachersArr = ref([]) as  any
    let studentsArr = ref([]) as any
    let newTeachersArr = ref([]) as  any
    let newStudentsArr = ref([]) as  any
    let startTime = computed(()=>userInfo.startTime)
    let ws = ref([]) as  any
    let isUpload = ref(false)

    let dialogFormVisible = ref(false)

    adminInfo.checkAdimin()

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
        if (toRaw(newStudentsArr.value).length != 0) {
            addStudents()
        }
        if (toRaw(newTeachersArr.value).length != 0) {
            addTeachers()
        }
        deleteUploadData()
    }

    //删除上传文件数据
    let deleteUploadData = () => {
        teachersArr.value = []
        studentsArr.value = []
        newStudentsArr.value = []
        newTeachersArr.value = []
        isUpload.value = !isUpload.value
    }

</script>

<style scoped>
    .span {
        display: block;
        text-align: center;
        margin: 0 auto;
        font-size: x-large;
        font-family: STKaiti;
        color: #303133;
        padding: 5px;
        margin-bottom: 10px;
    }
    .addUser {
        display: flex;
        justify-content: center;                              
        align-items: center;
    }

    .dialog-footer button:first-child {
        margin-right: 10px;
    }

    .card-header {
        display: block;
        margin: 0 auto;
    }

    el-main {
        height: 100%;
    }

    .demo-progress .el-progress--line {
        margin-bottom: 15px;
        width: 350px;
    }

    .demo-progress .el-progress--circle {
        margin-right: 15px;
    }
</style>