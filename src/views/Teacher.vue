<template>
    <div class="page-heading">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <h1>选择中心</h1>
                    <p>本年度选导师系统开放时间：<strong>{{userInfo.startTime}}</strong></p>
                </div>
            </div>
        </div>
    </div>

    <!-- 未选名单 -->
    <section class="simple-post">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12" v-show="!isLoding">
                    <div class="section-heading">
                        <h2>未选名单</h2>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <el-table ref="singleTable" :data="tableData1" highlight-current-row style="width: 100%"
                                height="280" id="unSelectedStudent">
                                <el-table-column type="index" width="100">
                                </el-table-column>
                                <el-table-column property="name" label="姓名" width="160">
                                </el-table-column>
                                <el-table-column property="number" label="学号" width="200">
                                </el-table-column>
                            </el-table>
                            <button type="button" class="btn"
                                @click="exportTable('unSelectedStudent','未选学生名单')">导出表格</button>
                        </div>
                        <div class="col-md-6">
                            <figure class="figure">
                                <img src="../assets/images/form1.jpg" class="figure-img img-fluid rounded" alt="...">
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 已选名单 -->
    <section class="simple-post">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12" v-show="!isLoding">
                    <div class="section-heading">
                        <h2>我的学生</h2>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <figure class="figure">
                                <img src="../assets/images/form2.jpg" class="figure-img img-fluid rounded" alt="...">
                            </figure>
                        </div>
                        <div class="col-md-6">
                            <el-table ref="singleTable" :data="tableData2" highlight-current-row style="width: 100%"
                                height="280" id="myStudent">
                                <el-table-column type="index" width="60">
                                </el-table-column>
                                <el-table-column property="name" label="姓名" width="150">
                                </el-table-column>
                                <el-table-column property="number" label="学号" width="180">
                                </el-table-column>
                                <el-table-column property="teacherName" label="导师" width="180">
                                </el-table-column>
                            </el-table>
                            <button type="button" class="btn" @click="exportTable('myStudent','我的学生')">导出表格</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 所有学生选择情况 -->
    <section class="simple-post">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12" v-show="!isLoding">
                    <div class="section-heading">
                        <h2>所有学生选择情况</h2>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <el-table ref="exportTableRef" :data="tableData3" highlight-current-row style="width: 100%"
                                height="280" id="allStudent">
                                <el-table-column type="index" width="60">
                                </el-table-column>
                                <el-table-column property="name" label="姓名" width="75">
                                </el-table-column>
                                <el-table-column property="number" label="学号" width="120">
                                </el-table-column>
                                <el-table-column property="teacherName" label="导师" width="75">
                                </el-table-column>
                                <el-table-column property="selectTime" label="选择时间" width="200">
                                </el-table-column>
                            </el-table>
                            <button link="" type="button" class="btn"
                                @click="exportTable('allStudent','所有学生导师信息')">导出表格</button>
                        </div>
                        <div class="col-md-6">
                            <figure class="figure">
                                <img src="../assets/images/form3.jpg" class="figure-img img-fluid rounded" alt="...">
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang='ts'>
    import FileSaver from 'file-saver'
    import * as XLSX from 'xlsx';
    import { toRaw, ref, nextTick } from 'vue'
    import { userInfoStore } from '@/store/userInfo'
    import { teacherInfoStore } from '@/store/teacherInfo'

    let userInfo = userInfoStore()
    let teacherInfo = teacherInfoStore()
    let isLoding = ref(true)
    let tableData1 = ref([])
    let tableData2 = ref([])
    let tableData3 = ref([])

    //异步请求，获取表格数据
    nextTick(async () => {
        await teacherInfo.getUnCheckedStuent()
        await teacherInfo.getStuent()
        await teacherInfo.getAllStudent()
        isLoding.value = false
        tableData1.value = toRaw(teacherInfo.unSelectedList)
        tableData2.value = toRaw(teacherInfo.studentList)
        tableData3.value = toRaw(teacherInfo.allStudentList)
    })

    //导出表格数据
    let exportTable = ((tableName: string, exprotName: string) => {
        //获取 table 表格数据
        let et = XLSX.utils.table_to_book(document.querySelector(`#${tableName}`));
        let etout = XLSX.write(et, {
            bookType: 'xlsx',
            bookSST: true,
            type: 'array'
        });
        try {
            FileSaver.saveAs(new Blob([etout], {
                type: 'application/octet-stream'
            }), `${exprotName}.xlsx`);
        } catch (e) {
            console.log(e, etout);
        }
        return etout;
    })

</script>

<style scoped>
    .btn {
        background-color: rgb(182, 199, 163);
        margin: 15px;
    }

    .btn:hover {
        background-color: rgb(225, 232, 217);
    }
</style>