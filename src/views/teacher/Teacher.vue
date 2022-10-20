<template>
    <el-card shadow="always" class="box-card">
        <el-tabs style="height: max-content" class="demo-tabs">
            <el-tab-pane label="数据统计">
                <el-row>
                    <el-col :span="14" >
                        <div style="text-align: center;margin-top:20px;">
                            <el-progress type="dashboard" :percentage="activeName=='first'?percent1:percent2" :width="150"
                                :status="percent1==100?'success':''">
                                <template #default="{length}">
                                    <span class="percentage-label">
                                        统计</span>
                                    <br><br>
                                    <span class="percentage-value" v-show="activeName=='first'">
                                        {{userInfo.user.count}}/{{(userInfo.user.total)}}
                                    </span>
                                    <span class="percentage-value" v-show="activeName=='second'">
                                        {{tableData3.length-tableData1.length}}/{{(tableData3.length)}}
                                    </span>
                                </template>
                            </el-progress><br>
                            <Export v-show="activeName=='second'"/>
                        </div>
                    </el-col>
                    <el-col :span="10">
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
                                    <span v-for="(t,index) in tableData2" :key="index">
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
                                        <span>未选学生</span>
                                    </span>
                                </template>
                                <div class="table-span">
                                    <span v-for="(t,index) in tableData1" :key="index">
                                        {{index+1}}{{t.name}};
                                    </span>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script lang="ts" setup>
    import { User } from '@/types/type'
    import { ref, computed, watch, defineAsyncComponent } from 'vue'
    import { userInfoStore } from '@/store/userInfo'
    import { teacherInfoStore } from '@/store/teacherInfo'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import { StarFilled, Share,Loading } from '@element-plus/icons-vue'
    import Export from '@/views/teacher/Export.vue'

    let userInfo = userInfoStore()
    let teacherInfo = teacherInfoStore()
    teacherInfo.getStudent()
    let dialogFormVisible = ref(false)
    let activeName = ref('first')
    let user = computed(()=>userInfo.user)
    let tableData1 = computed(() => teacherInfo.unSelectedList)
    let tableData2 = computed(() => teacherInfo.studentList)
    let tableData3 = computed(() => teacherInfo.allStudentList)
    let isShow = ref(false)
    let percent1 = ref(0)
    let percent2 = ref(0)
    let isOk = computed(() => teacherInfo.isOk) 

    watch(tableData3, () => {
        percent2.value = Number((Number(tableData3.value.length - tableData1.value.length) / Number(tableData3.value.length)).toFixed(3)) * 100
    })

    watch(user,()=>{
        percent1.value = Number((Number(user.value.count) / Number(user.value.total)).toFixed(3)) * 100
    })

    const handleClick = (tab: TabsPaneContext, event: Event) => {
        if (tab.props.name == 'second') {
            activeName.value = 'second'
            if(!isOk.value){
                teacherInfo.getAllStudent()
                teacherInfo.getUnCheckedStuent()
            }
        } else {
            activeName.value = 'first'
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