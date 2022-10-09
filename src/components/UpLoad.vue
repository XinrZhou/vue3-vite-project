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
  const emits = defineEmits(['UploadData'])

  //处理xlsx表格数据
  let loadFile = (file:any,fileList:any)=>{
        const upload_file=fileList[0].raw;
        const reader=new FileReader();
        reader.readAsBinaryString(new Blob([upload_file],{type: "application/vnd.ms-excel"}));  
        reader.onload=ev=>{
          try{
            let f=ev.target
            if(f){
              const file=f.result;
              const workbook=XLSX.read(file,{type:"binary"});
              const wsname=workbook.SheetNames[0];
              let ws=XLSX.utils.sheet_to_json(workbook.Sheets[wsname],{header:1,defval:'#'});
              emits('UploadData',ws)
            }
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