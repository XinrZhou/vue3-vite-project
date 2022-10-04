<template>
  <!-- Page Heading -->
  <div class="page-heading">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <h1>个人中心</h1>
        </div>
      </div>
    </div>
  </div>

  <section class="simple-post">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-6">
          <form>
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-2 col-form-label">用户名</label>
              <div class="col-sm-10">
                <input type="email" class="form-control" v-model="userInfo.uid" disabled>
              </div>
            </div>
            <div class="form-group row">
              <label for="inputEmail3" class="col-sm-2 col-form-label">密码</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" v-model="userInfo.password"
                  :disabled="isDisable?true:false">
              </div>
            </div>
            <div class="form-group row">
              <div class="col-sm-10">
                <button type="button" class="btn" @click="changeBtnStatus">修改密码</button>
                <button type="button" class="btn" @click="changePwd">确认修改</button>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <figure class="figure">
            <img src="../assets/images/mycenter.jpg" class="figure-img img-fluid rounded" alt="...">
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang='ts'>
  import { ref,onMounted } from 'vue'
  import { userInfoStore } from '@/store/userInfo'

  let userInfo = userInfoStore()
  let isDisable = ref(true)
  let changeBtnStatus = () => {
    isDisable.value = false
  }

  onMounted(() => {
    userInfo.getInfo()
  })

  //修改密码
  let changePwd = () => {
    try {
      userInfo.changePwd(userInfo.password)
    } catch (error: any) {
      alert(error.message)
    }
    isDisable.value = !isDisable.value
  }
</script>

<style scoped>
  button {
    background-color: rgb(182, 199, 163);
    margin: 10px;
  }
</style>