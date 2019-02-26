<template>
  <div class="article">
    <h1>{{ this.$route.query.title }}</h1>
    <span>歌迪亚 2018.11.11</span>
    <div class="section">
      <h2>  (一)床垫的主要介绍</h2>
      <p>1.一线弹簧</p>
      <img src="../../assets/imgs/article_search.png" alt="">
      
    </div>
  </div>
</template>

<script>
import Vuex, { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {

    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.article {
  padding: 4.26vw;
  text-align: center;
  h1 {
    color: #353535;
    font-size: 4.53vw;
  }
  span {
    color: #909090;
    font-size: 3.73vw;
  }
  .section {
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
