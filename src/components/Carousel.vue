<template>
    <div class="block text-center" autoplay >
      <el-carousel height="200px" indicator-position="outside">
        <el-carousel-item>
          <h3 class="small justify-center" text="2xl">
            <img src="@/assets/images/carousel1.jpg">
          </h3>
        </el-carousel-item>
        <el-carousel-item>
            <h3 class="small justify-center" text="2xl">
              <img src="@/assets/images/carousel2.jpg">
            </h3>
          </el-carousel-item>
          <el-carousel-item>
            <h3 class="small justify-center" text="2xl">
              <img src="@/assets/images/carousel3.jpg">
            </h3>
          </el-carousel-item>
      </el-carousel>
    </div>
</template>

<script lang="ts" setup>

</script>
  
  <style scoped>
    .block{
        margin-top: 20px;
    }
  </style>