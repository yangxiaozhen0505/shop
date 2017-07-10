<template>
  <div>
    <m-header title="列表页"></m-header>
    <scroller :on-refresh="refresh" ref="scroller" class="top">
      <ul class="list">
        <li v-for="book in books">
          <img v-lazy="book.bookCover" alt="">
          <div>
            <h3>{{book.bookName}}</h3>
            <p>{{book.content}}</p>
            <i class="iconfont icon-shoucang" @click="save(book)"></i>
            <p class="btn-list">
              <router-link :to="{path:'/update/'+book.id}" tag="button">修改</router-link>
              <button @click="remove(book.id)">删除</button>
            </p>
          </div>
        </li>
      </ul>
    </scroller>
  </div>
</template>
<script>
  import MHeader from 'components/MHeader';
  import {getBook, removeBook} from 'api';
  import {mapMutations} from 'vuex';
  import * as Types from '../store/mutation-types'
  export default {
    data(){
      return {
        books: []
      }
    },
    created(){
      getBook().then(res => {
        this.books = res.data;//将获取的数据放到sliders的数组中
        // console.log(res.data);
      }).catch(err => {
        console.log(err);
      });
    },
    computed: {},
    components: {MHeader},
    methods: {
      ...mapMutations([Types.ADD_COLLECT]),
      save(book){
        this[Types.ADD_COLLECT](book);
        this.$router.push('/collect');
      },
      refresh(){
        //获取最新数据
        this.getList();
      },
      getList(){
        getBook().then(res => {
          this.books = res.data;//将获取的数据放到sliders的数组中
          // console.log(res.data);
          //加载数据后，获取scroller 调用finishPullToRefresh()
          this.$refs.scroller.finishPullToRefresh();
        }).catch(err => {
          console.log(err);
        });
      },
      remove(id){
        removeBook(id).then(res => {
          //前台删除成功后，将此项在页面中删除掉
          this.books = this.books.filter(item => item.id != id);
        })
      }
    }
  }
</script>
<style scoped lang="less">
  .btn-list {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    button {
      width: 60px;
    }
  }

  .list {
    li {
      display: flex;
      border-bottom: 1px solid #ccc;
      img {
        width: 100px;
        height: 100px;
      }
      div {
        h3 {
          color: #333;
          margin: 6px;
        }
        display: flex;
        flex-direction: column;
      }
      img[lazy='loading'] {
        background: url("../assets/loading.gif") no-repeat;
        background-size: 50%;
      }
      img[lazy="loaded"] {
        animation: fadeIn .5s;
      }
    }

  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .top {
    margin-top: 40px;
    .iconfont {
      font-size: 30px;
      color: orangered;
    }
  }


</style>
