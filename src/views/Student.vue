<template>
    <div class="page-heading" v-if="userInfo.teacherName=='undefined'">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <h1>选择中心</h1>
                    <p>本年度选导师系统开放时间：<strong>{{userInfo.startTime}}</strong></p>
                    <p>请同学们及时联系导师，在规定时间内完成导师选择。注意：<strong>一经选择，不可退改！！！</strong></p>
                </div>
            </div>
        </div>
    </div>

    <!-- 导师列表 -->
    <section class="tables" v-if="userInfo.teacherName=='undefined'">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-heading">
                        <h2>导师列表</h2>
                    </div>
                    <el-table ref="singleTable" :data="tableData" highlight-current-row @row-click="getSelectInfo"
                        style="width: 100%" height="200">
                        <el-table-column type="index" width="80">
                        </el-table-column>
                        <el-table-column property="name" label="姓名" width="240">
                        </el-table-column>
                        <el-table-column property="number" label="工号" width="240">
                        </el-table-column>
                        <el-table-column property="total" label="名额" width="240">
                        </el-table-column>
                    </el-table>
                    <div style="margin-top: 20px">
                        <button type="button" class="btn" @click="selectMyTutor">确认选择</button>
                    </div>

                </div>
            </div>
        </div>
    </section>

    <!-- 完成选择 -->
    <section class="simple-post" v-if="userInfo.teacherName!='undefined'">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="section-heading">
                        <h2>恭喜您，您已完成本年度导师选择！您的导师为{{userInfo.teacherName}}。</h2>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang='ts'>
    import { toRaw, ref, nextTick } from 'vue'
    import { userInfoStore } from '@/store/userInfo'
    import { studentInfoStore } from '@/store/studentInfo'

    let userInfo = userInfoStore()
    let studentInfo = studentInfoStore()
    let tid = 0
    let isLoding = ref(true)
    let tableData = ref([])


    //获取导师列表
    nextTick(async () => {
        await studentInfo.getTeacherList()   
        isLoding.value = false
        tableData.value = toRaw(studentInfo.teacherList)
    })

    //获取列表点击信息
    let getSelectInfo = (row:any) => {
        tid = toRaw(row).id
    }

    //选择导师
    let selectMyTutor = async () => {
        try{
            await studentInfo.selectTutor(tid)
            alert('选择成功！')
            location.reload()
        }catch(error:any){
            alert(error.message)
        }
    }

</script>

<style scoped>
    .btn {
        background-color: rgb(182, 199, 163);
        margin: 10px;
    }
</style>