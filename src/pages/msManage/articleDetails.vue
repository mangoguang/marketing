<template>
  <div class="article paddingTop">
    <banner :title="'文章详情'"/>
    <div class="titleBar">
      <h1>{{ this.$route.query.title }}</h1>
      <span>歌迪亚 2018.11.11</span>
      <collect-btn class="collentBtn" 
        :isCollect='isCollect'
        v-on:click.native='collect'/>
    </div>
    <div class="content">
      <h2>  (一)床垫的主要介绍</h2>
      <p>1.一线弹簧</p>
      <img src="../../assets/imgs/article_search.png" alt="">
      
    </div>
  </div>
</template>

<script>
import Banner from '../../components/banner'
import CollectBtn from '../../components/msManage/eggCollectBtn'
export default {
  components: {CollectBtn,Banner},
  data() {
    return {
      isCollect: true
    }
  },
  methods: {
    // 切换收藏按钮
    collect() {
      this.isCollect = !this.isCollect
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  padding: 4.26vw;
  text-align: center;
  padding-top: 22vw;
  .titleBar {
    position: relative;
    h1 {
      color: #353535;
      font-size: 4.53vw;
    }
    span {
      color: #909090;
      font-size: 3.73vw;
    }
    .collentBtn {
      position: absolute;
      right: 0;
      top: 0
    }
  }
  .content {
    text-align: left;
    h2,p {
      color: #363636;
      font-size: 3.73vw;
    }
    img {

    }
  }
}
</style>
