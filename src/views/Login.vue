<template>
  <div id="login-wrapper">
    <div id='stars'></div>
    <div id='stars2'></div>
    <div id='stars3'></div>
    <div class="login-box">
      <h2>选个导师带毕设</h2>
      <form>
        <div class="user-box">
          <input autocomplete="new-password" type="text" v-model="user.number" required key="username-v3" />
          <label>账号</label>
        </div>
        <div class="user-box">
          <input autocomplete="new-password" type="password" v-model="user.password" required key="password-v3" />
          <label>密码</label>
        </div>
        <a style="left:240px;" @click="login">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          登录
        </a>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { User } from '@/types/type'
  import { userInfoStore } from '@/store/userInfo'
  import { ref } from "vue";

  let userInfo = userInfoStore()

  let user = ref <User> ({})

  let login = () => {
    let number = user.value.number
    let password = user.value.password
    if (number == password) {
      userInfo.showResetPassword = true
    }
    userInfo.goLogin({
      number: number,
      password: password,
    })
    user.value.number = ''
    user.value.password = ''
  }
</script>

<style scoped>
  @import url('@/assets/css/login.css');
</style>