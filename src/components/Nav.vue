<template>
        <div id="sidebar">
    
            <div class="inner">
    
              <!-- Search Box -->
              <section id="search" class="alt">
                <p >欢迎您，
                  <span @click="goLogin()" v-show="!infoStore.name">请登录！</span>
                  <span v-show="infoStore.name">{{infoStore.name}}!</span>&nbsp;
                  <span @click="goLogout()" v-show="infoStore.name">退出</span>
                </p>
              </section>
                
                
              <!-- Nav -->
              <nav id="menu">
                <ul v-show="true">
                  <li><a @click="goPage('1')">主页</a></li>
                  <li><a @click="goPage('2')">选择中心</a></li>
                  <li><a @click="goPage('3')">个人中心</a></li>
                </ul>
              </nav>
    
              <Carousel/>
    
              <!-- Footer -->
              <footer id="footer">
                <p class="copyright">Design by:zxr</p>
              </footer>
    
            </div>
          </div>
    
</template>

<script setup lang='ts'>
  import {ref,onMounted} from 'vue'
  import Carousel from '@/components/Carousel.vue'
  import useGoPages from '@/hooks/useGoPages'
  import {userInfoStore} from '@/store/userInfo'

  const infoStore = userInfoStore()

  let { goPage,goLogin,goLogout } = useGoPages()

  onMounted(()=>{
    infoStore.getInfo()
  })


</script>

<style scoped>

</style>