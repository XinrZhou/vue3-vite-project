<template>
    <div class="block">
        <span class="demonstration">开始时间:{{time}}</span>
        <el-date-picker
          v-model="value2"
          type="datetime"
          placeholder="Select date and time"
          :shortcuts="shortcuts"
          value-format="YYYY-MM-DDTHH:mm:ss"
        />
    </div>
</template>
  
  <script lang="ts" setup>
  import moment from "moment";
  import { ref,watch } from 'vue'
  import { userInfoStore } from '@/store/userInfo'

  const infoStore = userInfoStore()

  let time = ref('')
  time.value = moment(infoStore.startTime).format("YYYY-MM-DD HH:mm:ss") 
  const value2 = ref('')
  const shortcuts = [
    {
      text: 'Today',
      value: new Date(),
    },
  ]
  const emits = defineEmits(['DateTime'])
  watch(value2,()=>{
    if(value2.value){
      time.value = moment(value2.value).format("YYYY-MM-DD HH:mm:ss") 
    }else{
      time.value = moment(infoStore.startTime).format("YYYY-MM-DD HH:mm:ss") 
    }
    emits('DateTime',value2.value)
  })

  </script>

  <style scoped>
  .block {
    padding: 30px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
    flex: 1;
  }
  .block:last-child {
    border-right: none;
  }
  .demonstration {
    display: block;
    color: var(--el-text-color-secondary);
    font-size: 14px;
    margin-bottom: 20px;
  }
  </style>
  