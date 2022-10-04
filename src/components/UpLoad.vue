<template>
    <el-upload
    :on-change="loadFile"
    ref="uploadRef"
    class="upload-demo"
    :auto-upload="false"
  >
    <template #trigger>
      <el-button type="primary">选择文件</el-button>
    </template>

  </el-upload>
</template>

<script setup lang='ts'>
    import * as XLSX from 'xlsx'
    import { ref } from 'vue'

    let upload_file=ref('')
    let excelData=ref([])
    const emits = defineEmits(['UploadData'])

    let loadFile = (file:any,fileList:any)=>{
          upload_file=fileList[0].raw;
          const reader=new FileReader();
          reader.readAsBinaryString(upload_file);  
          reader.onload=ev=>{
            try{
              const f=ev.target.result;
              const workbook=XLSX.read(f,{type:"binary"});
              const wsname=workbook.SheetNames[0];
              console.log(wsname);
              const ws=XLSX.utils.sheet_to_json(workbook.Sheets[wsname],{header:1,defval:'#'});
              excelData=ws;
              emits('UploadData',excelData)
            }
            catch(e){
              console.log(e);
              return false;
            }
          }
        }

</script>

<style scoped>

</style>