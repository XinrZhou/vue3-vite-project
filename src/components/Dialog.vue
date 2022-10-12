<template>
  <el-dialog :model-value="dialogFormVisible" title="Reset Password" width="30%">
    <el-form >
      <el-form-item >
        <el-input type="password" v-model="pwd.pwd1" autocomplete="off" placeholder="password"/>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="pwd.pwd2" autocomplete="off" placeholder="re-enter"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resolveClose" >Cancel</el-button>
        <el-button type="primary" @click="resolveConfirm" :disabled="pwd.pwd1==''&&pwd.pwd2==''?true:false">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
 
<script setup lang="ts">
  import { reactive, ref,defineEmits,toRaw} from "vue"
  import { ElMessage} from 'element-plus'
  
  let dialogFormVisible = ref(false)
  let isDisabled = ref(true)

  let emits = defineEmits(['handleClose','handleConfirm'])
  
  let pwd = reactive({
    pwd1:'',
    pwd2:''
  })

  let resolveClose = ()=>{
    emits('handleClose')
  }

  let resolveConfirm = ()=>{
    emits('handleConfirm',toRaw(pwd))
  }
 
 
</script>
 
<style scoped>
  .el-button--text {
    margin-right: 15px;
  }
  .el-select {
    width: 300px;
  }
  .el-input {
    width: 300px;
  }
  .dialog-footer button:first-child {
    margin-right: 10px;
  }
</style>