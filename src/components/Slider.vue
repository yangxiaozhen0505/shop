<template>
  <!-- Slider main container -->
  <div class="swiper-container">
    <!-- Additional required wrapper -->
    <div class="swiper-wrapper">
      <!-- Slides -->
      <div class="swiper-slide" v-for="item in data">
        <img :src="item" alt="">
      </div>
    </div>
    <!-- If we need pagination -->
    <div class="swiper-pagination"></div>

  </div>
</template>
<script>
  import Swiper from 'swiper';//会直接找到dist下的swiper.js
  import 'swiper/dist/css/swiper.css';//会直接找到dist下的swiper.js
  export default {
    props: ['data'],//会挂载在当前的组件的实例上
    data(){
      return {}
    },
    mounted(){
      new Swiper('.swiper-container', {
        loop: true,

        // If we need pagination
        pagination: '.swiper-pagination'
      })
    },
    computed: {},
    components: {},
    methods: {}
  }
</script>
<style scoped>
  img {
    width: 100%;
  }
</style>
