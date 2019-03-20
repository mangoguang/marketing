<template>
  <div class="search">
    <div class="search_box">
      <button class="cancle" @click="cancleBtn"></button>
      <Search class="searchComp" ref="inp"
        v-model.trim="searchVal"
        :deleteVal='deleteVal'
        @keypress.native="search"
      />
    </div>
    <ul class="matchTxt" >
      
    </ul>
    <!-- 没有匹配到相关内容 -->
    <div class="search_nothing" >
      <p>未找到相关产品</p>
    </div>
  </div>
</template>

<script>
import {IndexModel} from '../../utils/index'
const indexModel = new IndexModel()
import { mapMutations, mapState } from 'vuex'
import Search from '../../components/msManage/search/eggSearchInp'
import {fuzzyQuery, changeColor, setLocalStorage, getLocalStorage, skipNewPage} from '../../utils/msManage'
export default {
  components: { Search },
  data() {
    return {
      searchVal: '',
      searchType: '',
      ajaxData:{}
    }
  },
  watch: {
    //匹配关键字且关键字高亮
    searchVal() {
    }
  },
  created() {
    this.searchType = this.$route.query.type
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  methods: {
    search(event) {
      if (event.keyCode == 13) { //如果按的是enter键 13是enter 
        event.preventDefault(); //禁止默认事件（默认是换行） 
        console.log(event.target.value)
        this.searchKey()
        this.hide()
      }
    },
    //
    hide() {
     
    },
    searchKey() {
      let key = this.searchVal
      indexModel.productSearch(key).then(res => {
        console.log(res)
      })
    },
    //清空输入框
    deleteVal(val) {
      this.searchVal = val
    },
    //返回首页
    cancleBtn() {
      this.$router.go(-1)
    }
 
  }
}
</script>

<style lang="scss" scoped>
.search {
  height: 100vh;
  background: #f7f7f7;
  box-sizing: border-box;
  .search_box {
    padding: 2vw 4vw;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .searchComp {
      width: 78.66vw;
      margin-left: 2vw;
    }
    .cancle {
      background: url(../../assets/imgs/back.png) no-repeat center;
      background-size: contain;
      width: 2.66vw;
      height: 4.8vw;
      padding-right: 6vw;
    }
  }
  .search_nothing {
    p {
      color: #666;
      font-size: 3.73vw;
      border-bottom: 1px solid #e1e1e1;
      margin-left: 4vw;
      line-height: 10vw;
    }
  }
  .historySearch {
    background: #fff;
  }
  .matchTxt {
    width: 100%;
    line-height: 10.4vw;
    color: #666;
    font-size: 3.73vw;
    padding-left: 4vw;
    border-top: 1px solid #ccc;
    li {
      border-bottom: 1px solid #e1e1e1;
    }
  }
  a {
    color: #666
  }
}
</style>



