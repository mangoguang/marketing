<template>
  <div class="collect" ref="collectScroll">
    <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="collectLoadMore" :auto-fill="false"> 
      <SwipeDelete v-for="(item, index) in list" :key="index" 
        :list="item" 
        :index="index"
        :cancleCollect='cancleCollect'/>
    </mt-loadmore>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import { Loadmore } from 'mint-ui'
Vue.component(Loadmore.name, Loadmore)
import Vue from 'vue'
import SwipeDelete from "../../../components/Gallery/collect/index";
import { IndexModel } from "../../../utils/index";
const indexModel = new IndexModel();
export default {
  components: { SwipeDelete },
  data() {
    return {
      list: [],
      ajaxData: {},
      allLoaded: false
    };
  },
  created() {
    let ajaxData = localStorage.getItem("ajaxData");
    this.ajaxData = JSON.parse(ajaxData);
  },
  computed: {
    ...mapState({
      collectLimit: (state, num) => state.collectLoadMore.collectLimit,
      collectScorll: (state, num) => state.collectLoadMore.collectScorll
    })
  },
  mounted() {
    this.initData()
  },
  methods: {
    ...mapMutations(['setCollectLimit', 'setCollectScorll']),
      //获取滚动条高度
    recordScrollPosition(e) {
      if(e.target.scrollTop === 0) {
        return
      }
      this.setCollectScorll(e.target.scrollTop)
    },
    //监听滚动条高度
    listenScrollTop() {
      this.$refs.collectScroll.addEventListener('scroll',this.recordScrollPosition,false);
      this.$nextTick(() => {
        this.$refs.collectScroll.scrollTop = this.collectScorll; 
      })
    },
    //初始化数据
    initData() {
      if(this.collectLimit) {
        this.getData(this.collectLimit)
      }else {
        this.getData(10)
      }
    },
    //请求数据
    getData(limit) {
      let parmas = this.getParmas(limit)
      indexModel.getCollect(parmas).then(res => {
        if (res.data) {
          this.list = res.data;
          this.setCollectLimit(this.list.length)
          let len = (this.list.length)/10 + 1
          if(Math.floor(len) < len) {
            this.allLoaded = true
          }else {
            this.allLoaded = false
          }
          this.listenScrollTop()
        }
      })
    },
    //请求数据的参数
    getParmas(limit) {
      let obj = {
        type: 3,
        account: this.ajaxData.account,
        page: 1,
        limit: limit
      };
      return obj
    },
    cancleCollect(val) {
      this.list.splice(val, 1)
      this.setCollectLimit(this.list.length)
    },
    //下拉刷新
    loadBottom() {
      this.$refs.collectLoadMore.onBottomLoaded();
      this.pullDownData()
    },
     //下拉加载数据
    pullDownData() {
      this.allLoaded = true
      let limit = this.collectLimit + 10
      this.getData(limit)
    }
  }
};
</script>

<style lang="scss" scoped>
.collect {
  width: 100vw;
  box-sizing: border-box;
  overflow: scroll;
  -webkit-overflow-scrolling:touch; 
  padding-bottom: 30vw;
}
</style>


