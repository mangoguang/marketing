<template>
  <div class="listComp">
    <ul>
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="false"> 
      <li v-for="(item, index) in list" :key="index" @click="toArticle(index)">
        <div class="list_left">
          <h1>{{item.title}}</h1>
          <div class="list_bottom">
            <span v-if="item.top" class="top">置顶</span>
            <span class="time">{{item.time}}</span>
          </div>
        </div>
        <div class="list_right">
          <!-- <img :src="itemUrl" alt=""> -->
        </div>
      </li>
    </mt-loadmore>
    </ul>
  </div>
</template>

<script>
import { Loadmore } from 'mint-ui'
Vue.component(Loadmore.name, Loadmore)
import Vue from 'vue'
export default {
  data() {
    return {
      allLoaded:false,
      list: [
        {
          title: '慕思产品三包服务政策详解1111111',  //  文章标题
          time: '2019-02-20',  //  文章上传时间
          imgUrl: '../img.jpg',  //  文章缩略图
          articleId: '201902201234',  //  文章id
          top: true  //  是否置顶文章
        },
        {
          title: '慕思产品三包服务政策详解',  //  文章标题
          time: '2019-02-20',  //  文章上传时间
          imgUrl: '../img.jpg',  //  文章缩略图
          articleId: '201902201235',  //  文章id
          top: true  //  是否置顶文章
        },
         {
          title: '慕思产品三包服务政策详解',  //  文章标题
          time: '2019-02-20',  //  文章上传时间
          imgUrl: '../img.jpg',  //  文章缩略图
          articleId: '201902201236',  //  文章id
          top: false  //  是否置顶文章
        },
         {
          title: '慕思产品三包服务政策详解',  //  文章标题
          time: '2019-02-20',  //  文章上传时间
          imgUrl: '../img.jpg',  //  文章缩略图
          articleId: '201902201237',  //  文章id
          top: false  //  是否置顶文章
        },
        {
          title: '慕思产品三包服务政策详解',  //  文章标题
          time: '2019-02-20',  //  文章上传时间
          imgUrl: '../img.jpg',  //  文章缩略图
          articleId: '201902201237',  //  文章id
          top: false  //  是否置顶文章
        }
      ]
    }
  },
  methods: {
    getList() {
      //获取treelist组件传过来的参数，通过axios获取list
    },
    //跳转到文章详情	
    toArticle(index) {
      this.$router.push({
        path: '/articleDetails',
        query: {articleId: this.list[index].articleId}})
    },
     //下拉刷新
    loadBottom() {
      this.$refs.loadmore.onBottomLoaded();
      console.log(12)
      this.pullDownData()
    },
    //下拉加载数据
    pullDownData(startTime, endTime) {
      // if (this.page < this.allPage) {
      //   this.allLoaded = true
      //   this.page ++;
      //   this.getData(this.page, this.limit, startTime, endTime);
      // }else {
      //   mango.tip('没有更多数据了')
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.listComp {
  li {
    width: 100vw;
    height: 26.66vw;
    box-shadow:0px 2px 6px 0px rgba(136,136,136,0.2);
    padding: 4.4vw;
    box-sizing: border-box;
    margin-bottom: 2.4vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .list_left {
      flex: 0.8;
      height: 20.66vw;
      display: flex;
      flex-direction: column;
      align-content: space-between;
      h1 {
        color: #363636;
        font-size: 5.4vw;
        font-weight: bold;
        flex: 0.8;
        line-height: 1.5em;
      }
      .list_bottom {
        flex: 0.2;
        font-size: 3.73vw;
        .top {
          color: #ff2d55;
        }
        .time {
          color: #909090;
        }
      }
    }
    .list_right {
        flex: 0.25;
        width: 21.33vw;
        height: 21.33vw;
        border:1px solid rgba(225,225,225,1);
        background:linear-gradient(30deg,rgba(60,182,238,1) 0%,rgba(125,226,255,1) 100%);
    }
  }
  
}
</style>

