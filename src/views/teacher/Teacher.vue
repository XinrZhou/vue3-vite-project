<template>
    <el-card shadow="always" class="box-card">
        <el-tabs style="height: max-content" class="demo-tabs">
            <el-tab-pane label="选择情况">
                <el-row>
                    <el-col :span="10">
                        <div style="text-align: center;margin-top:20px;">
                            <el-progress type="dashboard" :percentage="percent" :width="150"
                                :status="percent==100?'success':''">
                                <template #default="{length}">
                                    <span class="percentage-label">
                                        {{progressName}}</span>
                                    <br><br>
                                    <span class="percentage-value" v-show="activeName=='first'">
                                        {{userInfo.user.count}}/{{(userInfo.user.total)}}
                                    </span>
                                    <span class="percentage-value" v-show="activeName=='second'">
                                        {{tableData3.length-tableData1.length}}/{{(tableData3.length)}}
                                    </span>
                                </template>
                            </el-progress><br>
                            <el-button type="primary" @click="exportTable" v-show="activeName == 'second'">
                                导出毕设学生表格<el-icon class="el-icon--right">
                                    <Share />
                                </el-icon>
                            </el-button>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <el-tabs style="height: 260px" class="demo-tabs" @tab-click="handleClick" v-model="activeName">
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
                                        {{t.name}},
                                    </span>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane name="second">
                                <template #label>
                                    <span class="custom-tabs-label">
                                        <el-icon>
                                            <InfoFilled />
                                        </el-icon>
                                        <span>数据统计</span>
                                    </span>
                                </template>
                                <div class="table-span">
                                    <span style="font-size: large;">未选学生名单</span><br>
                                    <span v-for="(t,index) in tableData1" :key="index">
                                        {{t.name}},
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
    import moment from "moment"
    import { User } from '@/types/type'
    import FileSaver from 'file-saver'
    import * as XLSX from 'xlsx'
    import { ref, computed, onMounted, onBeforeUnmount,watch } from 'vue'
    import { userInfoStore } from '@/store/userInfo'
    import { teacherInfoStore } from '@/store/teacherInfo'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import type { TabsPaneContext } from 'element-plus'
    import { Link, StarFilled, Share, InfoFilled } from '@element-plus/icons-vue'

    let userInfo = userInfoStore()
    let teacherInfo = teacherInfoStore()
    let dialogFormVisible = ref(false)
    let activeName = ref('first')
    let progressName = ref('我的学生')

    teacherInfo.getAllStudent()
    teacherInfo.getUnCheckedStuent()
    teacherInfo.getStudent()
    let tableData1 = computed(() => teacherInfo.unSelectedList)
    let tableData3 = computed(() => teacherInfo.allStudentList)
    let tableData2 = computed(() => teacherInfo.studentList)
    let user = computed(()=>userInfo.user)
    let rowData = ref([]) as any
    let percent = ref(0)
    
    watch(user,()=>{
        percent.value = Number((Number(user.value.count) / Number(user.value.total)).toFixed(3)) * 100
    })
    
    const handleClick = (tab: TabsPaneContext, event: Event) => {
        if (tab.props.name == 'second') {
            activeName.value = 'second'
            progressName.value = '完成率'
            percent.value = Number((Number(tableData3.value.length - tableData1.value.length) / Number(tableData3.value.length)).toFixed(3)) * 100
        } else {
            activeName.value = 'first'
            progressName.value = '我的学生'
            percent.value = Number((Number(user.value.count) / Number(user.value.total)).toFixed(3)) * 100
        }
    }

    //导出表格数据
    let exportTable = (() => {
        //表头
        let tableData = [
            ['#', '学号', '姓名', '导师']
        ]
        tableData3.value.forEach((item: any, index: any) => {
            if (tableData3.value) {
                rowData.value = [
                    index + 1,
                    item.number,
                    item.name,
                    item.teacherName,
                ]
            }
            tableData.push(rowData.value)
        })
        let workSheet = XLSX.utils.aoa_to_sheet(tableData);
        let bookNew = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(bookNew, workSheet, '毕设学生表格')
        let name = '毕设学生表格' + '.xlsx'
        XLSX.writeFile(bookNew, name)
    })
</script>

<style scoped>
    .table-span {
        margin: 10;
        font-size: medium;
        font-family: KaiTi;
        color: #303133;
    }
</style>