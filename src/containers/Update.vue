<template>
  <div>
    <m-header title="添加页面"></m-header>
    <div class="add">
      <div class="group">
        <label for="bookName">书名</label>
        <input type="text" id="bookName" placeholder="请输入书名" v-model="book.bookName">
      </div>
      <div class="group">
        <label for="content">书的详情</label>
        <input type="text" id="content" placeholder="请输入书的详细内容" v-model="book.content">
      </div>
      <div class="group">
        <label for="bookCover">书的地址</label>
        <input type="text" id="bookCover" placeholder="请输入书的封面" v-model="book.bookCover">
      </div>
      <div class="group">
        <button @click="update">修改图片</button>
        <router-link to="/list" tag="button">返回</router-link>
      </div>

    </div>
  </div>
</template>
<script>
  import MHeader from 'components/MHeader';
  import {getOneBook, updateBook} from 'api';
  export default {
    data(){
      return {
        book: {
          bookName: '',
          bookCover: '',
          content: ''
        }
      }
    },
    computed: {},
    components: {MHeader},
    created(){
      this.getBook();
    },
    methods: {
      getBook(){
        getOneBook(this.$route.params.id).then(res => {
          this.book = res.data;//将数据挂载视图上

        });
      },
      update(){
//修改 在服务端 需要改哪一本书 数的id api/book?id=1 2,告诉更改的内容book
        //属性都挂在route上
        //钩子方法 beforeRouteEnter最小 beforeEnter次之 beforeEach最大
        //组件 子传父 事件 emit 父传子 属性 props
        //vuex 集中管理状态 基于flux redux    mutations存放规则  提交commit('changeColor')
        updateBook(this.$route.params.id, this.book).then(res => {
          this.$router.push('/list')
        })

      }
    },
    activated(){//如果keep-active执行 z
      this.getBook();
    }
  }
</script>
<style scoped lang="less">
  .add {
    display: flex;
    padding: 0 20px;
    flex-direction: column;
    .group {
      label {
        font-size: 16px;
        line-height: 25px;

      }
      input {
        border: 1px solid #ccc;
        height: 30px;
      }
      display: flex;
      margin-bottom: 10px;
      flex-direction: column;
      button {
        height: 35px;
      }
    }
  }
</style>
