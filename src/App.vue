<template>
  <div>
    <div class="content">
      <!--//保持缓存，缓存在页面-->
      <transition name="trans">
        <keep-alive>
          <router-view class="view"></router-view>
        </keep-alive>
      </transition>
    </div>
    <tab></tab>
  </div>
</template>
<script>
  //导入组件
  import Tab from './components/Tab'
  export default {
    data(){
      return {}
    },
    computed: {},
    components: {Tab},
    methods: {}
  }
</script>
<style scoped>
  .view {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 65px;
  }

  .trans-enter {
    transform: translate(100%);
  }

  .trans-enter-active {
    transition: .2s linear;
  }

  .trans-leave-active {
    transition: .2s linear;
    transform: translate(-100%);
  }
</style>
