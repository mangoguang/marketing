<template>
  <ul class="categoryList">
    <Category
      v-for="(item, index) in list"
      :key="index"
      :list="item"
      :bgColor="bgColor[index]"
      @click.native="toArt(index)"
    />
    <router-link :to="{
      name:'/question',
      query:{id: 4,name:'常见问题',type:1}}">
      <li class="question">
        <div class="icon">
          <img src="../../../assets/imgs/ms-policy.png" alt>
        </div>
        <div class="text">
          <p>常见问题</p>
        </div>
      </li>
    </router-link>
  </ul>
</template>

<script>
import { IndexModel } from "../../../utils/index";
const indexModel = new IndexModel();
import Category from "./category";
export default {
  components: { Category },
  data() {
    return {
      list: [],
      bgColor: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //获取首页一级列表接口
    getData() {
      let classify = this.$route.query.classify
      indexModel.getCategory1List(classify).then(res => {
        if (res.data) {
          this.list = res.data;
          this.getBgColor()
        }
      });
    },
    //获取背景颜色
    getBgColor() {
      let len = this.list.length
      let arr = [];
      for(var i = 0; i < len; i ++) {
        if(i%4 === 0) {
          arr.push("#FF2D55")
        }else if(i%4 === 1) {
          arr.push("#FFCC00")
        }else if(i%4 === 2) {
          arr.push("#FF964B")
        }else if(i%4 === 3) {
          arr.push("#007AFF")
        }
      }
      this.bgColor = arr
    },
   //跳转页面
    toArt(index) {
      this.$router.push({
        path: "/policy",
        query: {
          id: this.list[index].id,
          name: this.list[index].name,
          type: 1,
          classify: this.$route.query.classify
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.categoryList {
  padding: 4vw 6.6vw;
  display: flex;
  overflow: scroll;
  .question {
    margin-right: 4vw;
    .icon {
      width: 16vw;
      height: 16vw;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      background: #007aff;
    }
    img {
      width: auto;
      height: auto;
    }
    .text {
      color: #666;
      font-size: 3.73vw;
      text-align: center;
      word-wrap: break-word;
      line-height: 1.4em;
      margin-top: 2vw;
    }
  }
}
</style>
