<template>
  <!-- Banner -->
  <section class="main-banner">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="banner-content">
            <div class="row">
              <div class="col-md-12">
                <div class="banner-caption">
                  <h4><em>东北林业大学</em>毕设选导师系统</h4>
                  <span> HELLO&amp; NEFUER</span>
                  <p v-if="getRole()=='ppYMg'||getRole()==''?true:false">
                    为保证本年度毕设选导师工作顺利进行，请老师和同学<strong>留意官网通知</strong>，在规定时间内完成学生信息确认和导师选择。</p>
                  <p v-if="getRole()=='Yo87M'?true:false">
                    请同学们留意官网通知，在规定时间内完成导师选择。注意：<strong>导师一经选择，不可更改</strong>。有任何问题，请及时与教务处联系。</p>
                  <p v-if="getRole()=='nU0vt'?true:false">请老师留意官网通知，<strong>及时查看学生选导师完成情况。</strong>有任何问题，请及时与教务处联系。
                  </p>
                  <div class="primary-button">
                    <a @click="goPage('2')" v-if="getRole()=='Yo87M'?true:false">开始选择</a>
                    <a @click="goPage('2')" v-if="getRole()=='nU0vt'?true:false">查看选择情况</a>
                  </div>
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
  import useGoPages from '@/hooks/useGoPages';
  import { getRole } from '@/utils/role';

  let { goPage } = useGoPages()

</script>

<style scoped>

</style>