<template>
    <div class="block">
        <span class="demonstration">With shortcuts</span>
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
  import { ref,watch } from 'vue'
  
  const value2 = ref('')
  const shortcuts = [
    {
      text: 'Today',
      value: new Date(),
    },
  ]
  const emits = defineEmits(['DateTime'])
  watch(value2,()=>{
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
  