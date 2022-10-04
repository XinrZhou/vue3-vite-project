<template>
  <!-- login -->
  <section class="main-banner">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="banner-content">
            <div class="row">
              <div class="col-md-12">
                <div class="banner-caption">
                  <h4 style="text-align: center;"><em>登录</em></h4>
                  <form>
                    <div class="form-group">
                      <label for="exampleInputEmail1">用户名：</label>
                      <input type="email" class="form-control" aria-describedby="emailHelp" v-model="User.number">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">密码：</label>
                      <input type="password" class="form-control" id="exampleInputPassword1" v-model="User.password">
                    </div>
                    <small id="emailHelp" class="form-text text-muted">初始用户名、密码为学工号</small>
                    <div class="primary-button">
                      <a @click="login">登录</a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang='ts'>
  import { useRouter } from 'vue-router';
  import {userInfoStore} from '@/store/userInfo'
  import { reactive } from 'vue'

  const router = useRouter()
  const infoStore = userInfoStore()

  let User = reactive({
    number: '',
    password: ''
  })

  let login = async()=>{
    try{
      await infoStore.goLogin(User)
      router.push('/home')
    }catch(error:any){
      alert(error.message)
    }

  }

</script>

<style scoped>

</style>