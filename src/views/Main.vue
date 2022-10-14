<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </div>
</template>

<script setup lang='ts'>
  import { computed } from 'vue'
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import { userInfoStore } from '@/store/userInfo'
 
  let userInfo = userInfoStore()
  userInfo.getInfo()
  let user = computed(()=>userInfo.user)

</script>

<style >
  .common-layout {
    max-width: 1000px;
    background-color: #F2F3F5;
    border: 1px solid #DCDFE6;
    margin: auto;
    border-radius: 3px;
    height: 100%;
    padding: 5px;
  }
  .span {
    display: inline-block;
    margin: 10px;
  }
  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .box-card {
    background-color: #FFFFFF;
    margin: 10px;
  }
</style>