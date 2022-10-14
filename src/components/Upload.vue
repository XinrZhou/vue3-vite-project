<template>
    <el-upload ref="uploadRef" class="upload-demo" :auto-upload="false" accept=".xlsx" :on-change="change">
        <template #trigger>
            <el-button type="primary">选择文件</el-button>
        </template>
        <el-button slot="trigger" type="info" :icon="Delete" @click="deleteData" style="margin-left: 8px;" />
        <el-button type="success" :icon="Check" @click="addUser" />
        <template #tip>
            <div class="el-upload__tip text-red" style="text-align: center;">
                xls、xlsx格式
            </div>
        </template>
    </el-upload>
</template>

<script setup lang='ts'>
    import { ref, defineEmits, toRaw, watch, defineProps } from 'vue'
    import { ElMessage, ElMessageBox } from 'element-plus'
    import { Check, Delete } from '@element-plus/icons-vue'
    import * as XLSX from 'xlsx'

    let emits = defineEmits(['uploadData', 'deleteData', 'confirmUpload'])
    let ws = ref([]) as any
    const uploadRef = ref()
    const props = defineProps({
        isUpload:Boolean
    })

    watch(props,()=>{
        uploadRef.value.clearFiles()
    },{
        deep:true
    })

    //处理xlsx表格数据
    let change = (file: any, fileList: any) => {
        let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        let extension = testmsg === 'xls'
        let extension2 = testmsg === 'xlsx'
        if (!extension && !extension2) {
            ElMessage.error('上传文件只能是 xls、xlsx格式')
        } else {
            const upload_file = fileList[0].raw;
            const reader = new FileReader();
            reader.readAsBinaryString(new Blob([upload_file], { type: "application/vnd.ms-excel" }));
            reader.onload = ev => {
                try {
                    let f = ev.target
                    if (f) {
                        const file = f.result;
                        const workbook = XLSX.read(file, { type: "binary" });
                        const wsname = workbook.SheetNames[0];
                        ws.value = XLSX.utils.sheet_to_json(workbook.Sheets[wsname], { header: 1, defval: '#' });
                        ws.value.shift()
                        ws.value = toRaw(ws.value)
                        emits('uploadData', ws.value)
                    }
                } catch (e) {
                    console.log(e);
                    return false;
                }
            }
        }
        return extension || extension2
    }

    //取消上传
    let deleteData = () => {
        emits('deleteData')
    }

    //上传
    let addUser = () => {
        emits('confirmUpload', ws.value)
    }

</script>

<style scoped>

</style>