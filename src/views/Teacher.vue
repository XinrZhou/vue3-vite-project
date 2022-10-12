<template>
    <div class="common-layout" v-show="isShow">
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-main style="background-color: #F2F3F5;" height="100%">
                <el-card shadow="always" class="box-card">
                    <el-tabs style="height: max-content" class="demo-tabs">
                        <el-tab-pane label="选择情况">
                            <el-row>
                                <el-col :span="10">
                                    <div style="text-align: center;margin-top:20px;">
                                        <el-progress type="dashboard" :percentage="percent" :width="150"
                                            :status="percent==100?'success':''">
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
                                <el-col :span="14">
                                    <el-tabs style="height: 200px" class="demo-tabs">
                                        <el-tab-pane>
                                            <template #label>
                                                <span class="custom-tabs-label">
                                                    <el-icon><StarFilled/></el-icon>
                                                  <span>我的学生</span>
                                                </span>
                                                </template>
                                            <div class="table-span">
                                                {{tableData2.length==0?'':data2}}
                                            </div>
                                        </el-tab-pane>
                                        <el-tab-pane>
                                            <template #label>
                                                <span class="custom-tabs-label">
                                                  <el-icon><InfoFilled /></el-icon>
                                                  <span>未选学生</span>
                                                </span>
                                                </template>
                                            <div class="table-span">
                                                {{tableData1.length==0?'':data1}}
                                            </div>
                                        </el-tab-pane>
                                    </el-tabs>
                                </el-col>
                            </el-row>
                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </el-main>
            <el-footer>
                <Footer />
            </el-footer>
        </el-container>
        <Dialog v-model="dialogFormVisible" v-if="dialogFormVisible" @handleClose="resolveClose"
            @handleConfirm="resolveConfirm" />
    </div>
    <div>
    </div>
</template>

<script lang="ts" setup>
    import moment from "moment";
    import Header from '@/components/Header.vue'
    import FileSaver from 'file-saver'
    import * as XLSX from 'xlsx';
    import { toRaw, ref, nextTick } from 'vue'
    import { userInfoStore } from '@/store/userInfo'
    import { teacherInfoStore } from '@/store/teacherInfo'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import { Link, StarFilled,Share,InfoFilled } from '@element-plus/icons-vue'
    import Dialog from '@/components/Dialog.vue'
    import Footer from '@/components/Footer.vue'

    let dialogFormVisible = ref(false)
    let userInfo = userInfoStore()
    let teacherInfo = teacherInfoStore()
    let tableData1 = ref([]) as any
    let tableData2 = ref([]) as any
    let tableData3 = ref([]) as any
    let newTableData3 = ref([]) as any
    let rowData = ref([]) as any
    let isShow = ref(false)
    let percent = ref(0)
    let unselected = ref(false)
    let data1 = ref('')
    let data2 = ref('')

    let showUnselected = () => {
        unselected.value = true
    }

    //获取表格数据
    nextTick(async () => {
        await userInfo.getInfo()
        isShow.value = true
        if (userInfo.password != '' && userInfo.password == userInfo.uid) {
            dialogFormVisible.value = true
        }
        await teacherInfo.getAllStudent()
        await teacherInfo.getUnCheckedStuent()
        await teacherInfo.getStudent()
        tableData1.value = toRaw(teacherInfo.unSelectedList).map((item: any) => {
            return item.name
        })
        tableData2.value = toRaw(teacherInfo.studentList).map((item: any) => {
            return item.name
        })
        let str1 = JSON.stringify(tableData1.value)
        let name1 = str1.replace(/\[|]/g, '')
        data1.value = name1.replace(/\"/g, "")
        let str2 = JSON.stringify(tableData2.value)
        let name2 = str2.replace(/\[|]/g, '')
        data2.value = name2.replace(/\"/g, "")
        newTableData3.value = toRaw(teacherInfo.allStudentList).map((item: any) => {
            return item.name
        })
        tableData3.value = toRaw(teacherInfo.allStudentList)
        let length = tableData3.value.length - tableData1.value.length
        percent.value = Number((Number(length) / Number(tableData3.value.length)).toFixed(3)) * 100
    })

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

    //对话框——取消
    let resolveClose = () => {
        dialogFormVisible.value = false
    }

    //对话框——确认
    let resolveConfirm = (value: any) => {
        if (value.pwd1 != '' && value.pwd1 == value.pwd2) {
            userInfo.changePwd(value.pwd1)
        } else {
            ElMessageBox.alert('两次密码不一致，修改失败！', 'Tips', {
                confirmButtonText: 'OK',
                callback: (action: Action) => {
                    ElMessage({
                        type: 'info',
                        message: '修改失败',
                    })
                },
            })
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
        height: 100%;
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

    .box-card {
        background-color: #FFFFFF;
        margin: 10px;
    }

    .table-span {
        margin: 10;
        font-size: medium;
        font-family: KaiTi;
        color: #303133;
    }
</style>