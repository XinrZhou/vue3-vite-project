<template>
    <div class="common-layout" v-show="isShow">
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-main>
                <el-card class="box-card">
                    <div class="demo-collapse">
                        <el-collapse>
                            <el-row>
                                <el-col :span="1">
                                    <el-icon>
                                        <StarFilled />
                                    </el-icon>
                                </el-col>
                                <el-col :span="23">
                                    <el-collapse-item title="我的学生" name="3">
                                        <div>
                                            {{tableData2.length==0?'':tableData2}}
                                        </div>
                                    </el-collapse-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="1">
                                    <el-icon>
                                        <Search />
                                    </el-icon>
                                </el-col>
                                <el-col :span="23">
                                    <el-collapse-item title="未选学生名单" name="1">
                                        <div>
                                            {{tableData1.length==0?'':tableData1}}
                                        </div>
                                    </el-collapse-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="1">
                                    <el-icon>
                                        <Link />
                                    </el-icon>
                                </el-col>
                                <el-col :span="23">
                                    <el-collapse-item title="导出毕设学生表格" name="2" @click="exportTable()">
                                    </el-collapse-item>
                                </el-col>
                            </el-row>
                        </el-collapse>
                    </div>
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
    import { Link, Search, StarFilled } from '@element-plus/icons-vue'
    import Dialog from '@/components/Dialog.vue'
    import Footer from '@/components/Footer.vue'
    import { ElMessage, ElMessageBox } from 'element-plus'


    let dialogFormVisible = ref(false)
    let userInfo = userInfoStore()
    let teacherInfo = teacherInfoStore()
    let tableData1 = ref([]) as any
    let tableData2 = ref([]) as any
    let tableData3 = ref([]) as any
    // let activeIndex = ref('1')
    let rowData = ref([]) as any
    let isShow = ref(false)

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
        tableData3.value = toRaw(teacherInfo.allStudentList)
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
</style>