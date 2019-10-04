<template>
  <div class="search">
    <div class="search_box">
      <div class="back"></div>
      <div class="eggSearchInp">
        <div class="search_icon"></div>
        <input class="eggInp"
               ref="inpComp"
               type="search"
               v-model="searchVal"
               @input="bindSearch"
               placeholder="请输入搜索内容" />
        <button class="deleteVal"
                v-show="searchVal"
                @click="searchVal='',list=[]"></button>
      </div>
    </div>
    <!-- 匹配到相关内容 -->
    <ul class="matchTxt"
        v-show="matchTxt">
      <li v-for="(item, index) in searchList"
          :key="index"
          v-html='item'
          @click="bindArticle(index)"></li>
    </ul>
    <!-- 没有匹配到相关内容 -->
    <ul class="matchTxt"
        v-show="!matchTxt">
      <li>未找到相关产品</li>
    </ul>
  </div>
</template>

<script>
import { getNames } from '@/api/case'
import { mapMutations } from 'vuex'
import _ from 'lodash'
export default {
  data() {
    return {
      matchTxt: true,
      searchVal: '',
      list: []
    }
  },
  computed: {
    searchList() {
      var arr = []
      this.list.map((item, index) => {
        arr[index] = item
        let reg = new RegExp(this.searchVal, 'g')
        arr[index] = arr[index].replace(
          reg,
          `<span style="color:#ff2d55">${this.searchVal}</span>`
        )
      })
      return arr
    }
  },
  created() {},
  methods: {
    ...mapMutations(['setGoodCase']),
    bindSearch: _.debounce(async function() {
      let { namelist } = await getNames({ keys: this.searchVal })
      if (namelist.length) {
        this.list = namelist
        this.matchTxt = true
      } else {
        this.matchTxt = false
      }
    }, 500),
    bindArticle(index) {
      let goodId = this.list[index]
      this.setGoodCase({ goodId })
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  background: #fff;
  width: 100vw;
  overflow-x: hidden;
  .search_box {
    display: flex;
    justify-content: space-between;
    position: relative;
    .back {
      height: 30px;
      width: 30px;
      background: url(~@/assets/imgs/back.png) left center no-repeat;
      background-size: 10px 18px;
      position: absolute;
      bottom: 8px;
      left: 16px;
    }
    .searchComp {
      width: 75.47vw;
    }
    .cancle {
      width: 20vw;
      font-size: 4.26vw;
      color: #007aff;
    }
  }
  .search_nothing {
    border-top: 1px solid #ccc;
    position: relative;
    p {
      width: 100%;
      font-size: 4.8vw;
      color: #42596c;
      font-weight: bold;
      background: linear-gradient(
        0deg,
        rgba(63, 186, 230, 1) 0%,
        rgba(172, 208, 218, 1) 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
      position: absolute;
      top: 40.06vw;
      left: 0;
    }
    .search_bg {
      background: url(~@/assets/imgs/search_nothing.png) no-repeat center;
      width: 100%;
      height: 129.6vw;
      background-size: 100% 100%;
      margin-top: 16vw;
    }
  }
  .matchTxt {
    width: 100%;
    line-height: 10.4vw;
    color: #666;
    font-size: 3.73vw;
    padding-left: 4vw;
    border-top: 1px solid #ccc;
    max-height: 100vh;
    overflow: scroll;
    li {
      border-bottom: 1px solid #e1e1e1;
      font-size: 14px;
      span {
        color: #ff2d55;
      }
    }
  }
  a {
    color: #666;
  }
}
.eggSearchInp {
  width: 295px;
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  padding-bottom: 8px;
  padding-top: 8px;
  input {
    caret-color: #000;
  }
  .search_icon {
    background: url(../../../assets/imgs/egg_search.png) no-repeat center center;
    background-size: 100% 100%;
    width: 4.26vw;
    height: 4.26vw;
    position: absolute;
    left: 3vw;
    top: 50%;
    transform: translateY(-50%);
  }
  .eggInp {
    width: 100%;
    height: 8vw;
    line-height: 8vw;
    background: #f7f7f7;
    border-radius: 4vw;
    font-size: 3.46vw;
    padding: 0 9.33vw;
    box-sizing: border-box;
  }
  .deleteVal {
    background: url(../../../assets/imgs/egg_delete.png) no-repeat center;
    background-size: contain;
    width: 4.26vw;
    height: 4.26vw;
    position: absolute;
    right: 2vw;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }
}
</style>


