<!--  -->
<template>
  <div class="search_box">
    <img src="../../../assets/imgs/egg_search.png" alt="">
    <span class="serch_text">搜索</span>
  </div>
</template>

<script>
export default {
  data () {
    return {

    };
  }
}
</script>
<style lang='scss' scoped>
.search_box {
  width: 24.53vw;
  height: 6.26vw;
  border-radius: 3.2vw;
  background: #f7f7f7;
  position: absolute;
  bottom: 2.53vw;
  right: 6vw;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 3.73vw;
    height: auto;
  }
  .serch_text {
    color: #999;
    font-size: 3.46vw;
    padding-left: 1.6vw;
  }

}
</style>