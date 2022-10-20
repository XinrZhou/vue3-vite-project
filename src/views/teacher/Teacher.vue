<template>
    <el-card shadow="always" class="box-card">
        <el-row>
            <el-col :span="10" >
                <div style="text-align: center;margin-top:20px;">
                    <el-progress type="dashboard" :percentage="activeName=='first'?percentMyStudent:percentAll" :width="150"
                        :status="percent==100?'success':''">
                        <template #default="{length}">
                            <span class="percentage-label">
                                统计</span>
                            <br><br>
                            <span class="percentage-value" v-show="activeName=='first'">
                                {{userInfo.user.count}}/{{(userInfo.user.total)}}
                            </span>
                            <span class="percentage-value" v-show="activeName=='second'">
                                {{allStudentC.length-unselectedC.length}}/{{(allStudentC.length)}}
                            </span>
                        </template>
                    </el-progress><br>
                    <Export v-show="activeName=='second'"/>
                </div>
            </el-col>
            <el-col :span="14">
                <el-tabs style="height: 260px" class="demo-tabs" v-model="activeName" @tab-click="handleClick" >
                    <el-tab-pane name="first">
                        <template #label>
                            <span class="custom-tabs-label">
                                <el-icon>
                                    <StarFilled />
                                </el-icon>
                                <span>我的学生</span>
                            </span>
                        </template>
                        <div class="table-span">
                            <span v-for="(t,index) in mystudentC" :key="index">
                                {{index+1}}&nbsp;{{t.name}};
                            </span>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane name="second">
                        <template #label>
                            <span class="custom-tabs-label">
                                <el-icon>
                                    <Loading />
                                </el-icon>
                                <span>数据统计</span>
                            </span>
                        </template>
                        <div class="table-span">
                            <span v-for="(t,index) in unselectedC" :key="index">
                                {{index+1}}{{t.name}};
                            </span>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </el-card>
</template>

<script lang="ts" setup>
    import { User } from '@/types/type'
    import { ref, computed, watch, defineAsyncComponent } from 'vue'
    import { userInfoStore } from '@/store/userInfo'
    import { teacherInfoStore } from '@/store/teacherInfo'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import { TabsPaneContext } from 'element-plus'
    import { StarFilled, Share,Loading } from '@element-plus/icons-vue'
    import Export from '@/views/teacher/Export.vue'

    let userInfo = userInfoStore()
    let teacherInfo = teacherInfoStore()
    teacherInfo.getStudent()
    let dialogFormVisible = ref(false)
    let activeName = ref('first')
    let userC = computed(()=>userInfo.user)
    let mystudentC = computed(() => teacherInfo.studentList)
    let allStudentC = computed(() => teacherInfo.allStudentList)
    let unselectedC = computed(() => teacherInfo.unSelectedList)
    let isShow = ref(false)
    let percentMyStudent = ref(0)
    let percentAll = ref(0)
    let percent = ref(0)

    watch([allStudentC,unselectedC], () => {
        computePercent()
    })

    watch(userC,()=>{
        percentMyStudent.value = Number((Number(userC.value.count) / Number(userC.value.total)).toFixed(3)) * 100
        percent.value = percentMyStudent.value
    })

    const handleClick = (tab: TabsPaneContext, event: Event) => {
        if (tab.props.name == 'second') {
            if(!allStudentC.value.length){
                teacherInfo.getAllStudent()
                teacherInfo.getUnCheckedStuent()
            }
            percent.value = percentAll.value
        }else{
            percent.value = percentMyStudent.value
        }
    }

    let computePercent = ()=>{
        if(allStudentC.value.length && unselectedC.value.length){
            percentAll.value = Number((Number(allStudentC.value.length - unselectedC.value.length) / Number(allStudentC.value.length)).toFixed(3)) * 100
        }
    }
</script>

<style scoped>
    .table-span {
        margin: 10;
        font-size: medium;
        font-family: KaiTi;
        color: #303133;
    }
</style>