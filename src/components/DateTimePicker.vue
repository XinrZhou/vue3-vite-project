<template>
  <div class="block">
    <span class="demonstration">开始时间: {{time1}}</span>
    <el-date-picker v-model="value2" type="datetime" placeholder="Select date and time" :shortcuts="shortcuts"
      value-format="YYYY-MM-DDTHH:mm:ss" />
  </div>
</template>

<script lang="ts" setup>
  import moment from "moment";
  import { ref, watch,defineEmits,computed } from 'vue'
  import { userInfoStore } from '@/store/userInfo'
  
  let time = computed(()=>userInfo.startTime)
  let time1 = ref('')
  const userInfo = userInfoStore()
  const value2 = ref('')
  const shortcuts = [
    {
      text: 'Today',
      value: new Date(),
    },
  ]
  const emits = defineEmits(['DateTime'])

  time1.value = moment(userInfo.startTime).format("YYYY-MM-DD HH:mm:ss")
 
  watch(time,()=>{
    time1.value = moment(userInfo.startTime).format("YYYY-MM-DD HH:mm:ss")
  })

  watch(value2, () => {
    emits('DateTime', value2.value)
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