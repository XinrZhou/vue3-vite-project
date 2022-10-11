<template>
  <div id="login-wrapper">
    <div id='stars'></div>
    <div id='stars2'></div>
    <div id='stars3'></div>
    <div class="login-box">
      <h2>东北林业大学毕设选导师系统</h2>
      <form>
        <div class="user-box">
          <input autocomplete="new-password" type="text" v-model="User.number" required key="username-v3" />
          <label>账号</label>
        </div>
        <div class="user-box">
          <input autocomplete="new-password" type="password" v-model="User.password" required key="password-v3" />
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
  import { useRouter } from 'vue-router'
  import { userInfoStore } from '@/store/userInfo'
  import { reactive, ref } from "vue";

  const router = useRouter()
  const infoStore = userInfoStore()
  let pwd1 = ref('')
  let pwd2 = ref('')

  let User = reactive({
    number: '',
    password: ''
  })

  let login = async () => {
    try {
      await infoStore.goLogin(User)
      switch (infoStore.role) {
        case 'ppYMg':
          router.push('/admin')
          break;
        case 'Yo87M':
          router.push('/student')
          break;
        case 'nU0vt':
          router.push('/teacher')
          break;
      }
    } catch (error: any) {
      User.number = '',
        User.password = ''
    }
  }
</script>

<style scoped>
  @import url('@/assets/css/login.css');
</style>