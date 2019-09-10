<!--  -->
<template>
  <div class="searchIndex">
    <div class="header">
      <div class="back_icon"
           @click="$router.go(-1)">
        <img src="../../../assets/imgs/back.png"
             alt="">
      </div>
      <h2>搜索</h2>
    </div>
    <div class="search_wrapper">

      <div class="search_inp">
        <img src="../../../assets/imgs/egg_search.png"
             alt="">
        <!-- <form> -->
        <div class="from">
          <input type="search"
                 ref="inpComp"
                 placeholder="请输入搜索的内容"
                 @keyup.enter="bindSearch"
                 @blur="bindSearch">
        </div>
        <!-- </form> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: ''
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.path = from.path
    })
  },
  methods: {
    bindSearch(e) {
      this.$router.push({
        path: this.path,
        query: { searchVal: e.target.value }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.searchIndex {
  width: 100vw;
  height: 100vh;
  .no_data {
    text-align: center;
    color: #999;
    margin-top: 20vw;
  }
  .header {
    padding-top: 44px;
    height: 44px;
    display: flex;
    line-height: 44px;
    font-size: 14px;
    background-color: #fff;
    margin-bottom: 5px;
    .back_icon {
      margin-left: 24px;
      margin-right: 15px;
      display: flex;
      align-items: center;
      img {
        width: 10px;
        height: 17px;
        display: block;
      }
    }
    h2 {
      font-size: 14px;
      color: #000;
    }
  }
}
.search_wrapper {
  width: 100vw;
  height: 54px;
  background: #fff;
  display: flex;
  align-items: center;
  .back_icon {
    padding: 0 4.26vw;
    display: flex;
    align-items: center;
    img {
      width: 2.66vw;
      height: 4.66vw;
    }
  }
  .search_inp {
    width: 78.66vw;
    height: 8vw;
    border-radius: 4vw;
    background: #f7f7f7;
    display: flex;
    align-items: center;
    margin: 0 auto;
    img {
      width: 4.26vw;
      height: 4.26vw;
      margin-left: 4vw;
      margin-right: 1.2vw;
    }
    input {
      width: 65vw;
    }
    input::-webkit-input-placeholder {
      color: #999;
      font-size: 3.46vw;
    }
  }
}
</style>