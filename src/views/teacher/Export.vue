<template>
    <el-button type="primary" @click="exportTable">
        导出毕设学生表格<el-icon class="el-icon--right">
            <Share />
        </el-icon>
    </el-button>
</template>

<script setup lang='ts'>
    import { User } from '@/types/type'
    import FileSaver from 'file-saver'
    import * as XLSX from 'xlsx'
    import { ref, computed, watch,defineEmits } from 'vue'
    import { userInfoStore } from '@/store/userInfo'
    import { teacherInfoStore } from '@/store/teacherInfo'
    import { Share} from '@element-plus/icons-vue'

    let teacherInfo = teacherInfoStore()
    let tableData3 = computed(() => teacherInfo.allStudentList)
    let rowData = ref([]) as any

    let exportTable = (() => {
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

</style>