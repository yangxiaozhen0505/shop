<template>
    <div>
    <m-header title="收藏"></m-header>
      <ul class="collect-list">
        <li v-for="col in collect">
          <img :src="col.bookCover" alt="">
          <a @click="cancel(col.id)">取消收藏</a>
        </li>
      </ul>
    </div>
</template>
<script>
  import {mapState,mapMutations} from 'vuex';
  import MHeader from 'components/MHeader';
  import * as Types from '../store/mutation-types'
    export default {
        data(){
            return {}
        },
        computed: {
          ...mapState(['collect'])

        },
        components: {MHeader},
        methods: {
          ...mapMutations([Types.REMOVE_COLLECT]),
          cancel(id){
            this[Types.REMOVE_COLLECT](id);
          }
        }
    }
</script>
<style scoped lang="less">
  .collect-list{
    li{
      display:flex;
      flex-direction:row;
      align-items: center;
      border-bottom:1px solid #ccc;
      img{
        width: 100px;
        height: 100px;
        margin:10px;
      }
    }
  }
</style>
