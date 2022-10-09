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
                            <template #header>
                                <div class="card-header">
                                    <el-icon><Clock /></el-icon><span class="span">重置开始时间</span>
                                    <span class="span" >
                                        {{moment(userInfo.startTime).format("YYYY-MM-DD HH:mm:ss") }}
                                    </span>
                                    <el-button type="success" :icon="Check" plain @click="resetDateTime" />
                                </div>
                            </template>
                            <div class="text item">
                                <DateTimePicker @DateTime="getDateTime" />
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <el-icon><Edit /></el-icon><span class="span">重置密码</span>
                                    <el-button type="success" :icon="Check" plain @click="resetPwd" />
                                </div>
                            </template>
                            <el-row>
                                <el-col>
                                    <el-form label-position="left" label-width="100px" style="max-width: 500px;margin: auto;">
                                        <el-form-item>
                                            <el-input v-model="userNumber" placeholder="username"/>
                                        </el-form-item>
                                    </el-form>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span class="span">添加导师</span>
                                    <el-button type="info" :icon="Delete" plain @click="deletData" />
                                    <el-button type="success" :icon="Check" plain @click="addTeachers" />
                                </div>
                            </template>
                            <el-row>
                                <el-col :span="5">
                                    <UpLoad @UploadData="getUploadData" />
                                </el-col>
                                <el-col :span="19">
                                    <span class="span"
                                        v-show="teachersArr.length!=0?true:false">{{newTeachersArr}}<el-icon><MoreFilled /></el-icon></span>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col>
                        <el-card class="box-card">
                            <template #header>
                                <div class="card-header">
                                    <span class="span">添加学生</span>
                                    <el-button type="info" :icon="Delete" plain @click="deletData" />
                                    <el-button type="success" :icon="Check" plain @click="addStudents" />
                                </div>
                            </template>
                            <el-row>
                                <el-col :span="5">
                                    <UpLoad @UploadData="getUploadData" />
                                </el-col>
                                <el-col :span="19">
                                    <span class="span"
                                        v-show="studentsArr.length!=0?true:false">{{newStudentsArr}}......</span>
                                </el-col>
                            </el-row>
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
    import { ref, reactive, onMounted } from 'vue'
    import Header from '@/components/Header.vue'
    import UpLoad from '@/components/UpLoad.vue'
    import DateTimePicker from '@/components/DateTimePicker.vue'
    import { adminInfoStore } from '@/store/adminInfo'
    import { userInfoStore } from '@/store/userInfo'
    import { Clock,Edit,User,Check, Delete,MoreFilled} from '@element-plus/icons-vue'


    let adminInfo = adminInfoStore()
    let userInfo = userInfoStore()
    let userNumber = ref('')
    let dateTime = ref('')
    let uploadArr = ref([]) as any
    let teachersArr = ref([]) as any
    let studentsArr = ref([]) as any
    let newTeachersArr = ref([]) as any
    let newStudentsArr = ref([]) as any

    onMounted(() => {
        //管理员鉴权
        adminInfo.checkAdimin()
        userInfo.getInfo()
    })


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

    //获取upload中的数据
    let getUploadData = (value: any) => {
        value.shift()
        uploadArr.value = value
        if (uploadArr.value[0][3]) {
            for (let i = 0; i < uploadArr.value.length; i++) {
                teachersArr.value.push({ "name": uploadArr.value[i][2], "number": uploadArr.value[i][1].toString(), "total": uploadArr.value[i][3] })
            }
            newTeachersArr.value = teachersArr.value[0]
        } else {
            for (let i = 0; i < uploadArr.value.length; i++) {
                studentsArr.value.push({ "name": uploadArr.value[i][2], "number": uploadArr.value[i][1].toString() })
            }
            newStudentsArr.value = studentsArr.value[0]
        }
    }

    //添加导师
    let addTeachers = () => {
        try {
            adminInfo.addTeachers(teachersArr.value)
            teachersArr.value = []
        } catch (error: any) {
            console.log(error.message)
        }
    }

    //添加学生
    let addStudents = () => {
        try {
            adminInfo.addStudents(studentsArr.value)
            studentsArr.value = []
        } catch (error: any) {
            console.log(error.message)
        }
    }

    //取消添加
    let cancelAdd = (value:any) => {
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


</script>

<style scoped>
    div {
        max-width: 1000px;
        margin: auto;
    }

    .span {
        display: inline-block;
        margin: 10px;
        border: 1px solid #CDD0D6;
        padding: 8px;
        border-radius: 4px;
        background-color: #E6E8EB;
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
</style>