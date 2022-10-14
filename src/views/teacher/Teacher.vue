<template>
    <el-card shadow="always" class="box-card">
        <el-tabs style="height: max-content" class="demo-tabs">
            <el-tab-pane label="选择情况">
                <el-row>
                    <el-col :span="10">
                        <div style="text-align: center;margin-top:20px;">
                            <el-progress type="dashboard" :percentage="percent2" :width="150"
                                :status="percent2==100?'success':''" v-show="activeName == 'first'">
                                <template #default="{length}">
                                    <span class="percentage-label">我的学生</span>
                                    <br><br>
                                    <span
                                        class="percentage-value">{{userInfo.user.count}}/{{(userInfo.user.total)}}</span>
                                </template>
                            </el-progress>
                            <el-progress type="dashboard" :percentage="percent1" :width="150"
                                :status="percent1==100?'success':''" v-show="activeName == 'second'">
                                <template #default="{length}">
                                    <span class="percentage-label">完成率</span>
                                    <br><br>
                                    <span
                                        class="percentage-value">{{tableData3.length-tableData1.length}}/{{(tableData3.length)}}</span>
                                </template>
                            </el-progress> <br>
                            <el-button type="primary" @click="exportTable">
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
                                        <span>未选学生</span>
                                    </span>
                                </template>
                                <div class="table-span">
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
    import moment from "moment";
    import { User } from '@/types/type'
    import FileSaver from 'file-saver'
    import * as XLSX from 'xlsx';
    import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
    import { userInfoStore } from '@/store/userInfo'
    import { teacherInfoStore } from '@/store/teacherInfo'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import type { TabsPaneContext } from 'element-plus'
    import { Link, StarFilled, Share, InfoFilled } from '@element-plus/icons-vue'

    let dialogFormVisible = ref(false)
    let activeName = ref('first')
    let userInfo = userInfoStore()
    let teacherInfo = teacherInfoStore()

    teacherInfo.getAllStudent()
    teacherInfo.getUnCheckedStuent()
    teacherInfo.getStudent()
    let tableData1 = computed(() => teacherInfo.unSelectedList)
    let tableData2 = computed(() => teacherInfo.studentList)
    let tableData3 = computed(() => teacherInfo.allStudentList)
    let rowData = ref([]) as any
    let percent1 = ref(0)
    let percent2 = ref(0)

    let timer1 = setInterval(() => {
        percent1.value = Number((Number(tableData3.value.length - tableData1.value.length) / Number(tableData3.value.length)).toFixed(3)) * 100
    }, 1000)
    let timer2 = setInterval(() => {
        if (userInfo.user.count && userInfo.user.total) {
            percent2.value = Number((Number(userInfo.user.count) / Number(userInfo.user.total)).toFixed(3)) * 100
        }
    }, 1000)


    onBeforeUnmount(() => {
        window.clearInterval(timer1)
        window.clearInterval(timer2)
    })

    const handleClick = (tab: TabsPaneContext, event: Event) => {
        console.log()
        if (tab.props.name == 'second') {
            activeName.value = 'second'
        } else {
            activeName.value = 'first'
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