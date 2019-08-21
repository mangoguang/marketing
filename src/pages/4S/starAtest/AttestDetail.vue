<!--  -->
<template>
  <div class="details_wrapper"
       :style="{'margin-top':`${top}vw`}">
    <div class="details_header"
         :style="{'height':`${headerHeight}vw`}">
      <star-header />
      <star-nav class="star_nav"
                :starList='starList'
                :activeIndex="activeIndex"
                @changeStar='changeStar' />
    </div>
    <div class="details_content"
         :style="{'margin-top':`${top}vw,height:${height}`}">
      <circle-view :starData="starData"
                   :score="score"
                   :cycle="cycle"
                   :shopName="shopName" />
      <div class="line"></div>
      <record-content :checkCategories="checkCategories" />
    </div>
  </div>
</template>

<script>
import starHeader from '@/components/4s/record/recordDetails/header'
import starNav from '@/components/4s/record/recordDetails/starNav'
import CircleView from '@/components/4s/record/recordDetails/CircleView'
import recordContent from '@/components/4s/record/recordDetails/contentWrapper'
import { starGrade, checkloginfo } from '@/api/4s'
import { Toast } from 'mint-ui'
import { setTimeout } from 'timers';
export default {
  components: {
    starHeader,
    starNav,
    CircleView,
    recordContent
  },
  data () {
    return {
      top: '',
      height: '',
      headerHeight: '',
      starTop: '',
      starData: '',
      starList: [],
      activeIndex: 0,
      score: 0,
      cycle: 0,
      checkCategories: [],
      shopName: ''
    };
  },
  created () {
    let params = this.$route.query

    this._initData(params)
  },
  mounted () {
    this.isIPhoneX()
  },
  methods: {
    async  _getCheckLogInfo (params) {
      let { code, msg, checkLogInfo } = await checkloginfo(params)
      this.score = checkLogInfo.score
      this.cycle = checkLogInfo.cycle
      this.checkCategories = checkLogInfo.checkCategories
    },
    async   _initData (params) {
      let { code, msg, data } = await starGrade(params)
      if (code != 0) {
        Toast(msg)
        // setTimeout(() => { this.$router.go(-1) }, 2000)
        return;
      }
      this.score = data.getTotal || 0
      this.shopName = data.shopName || ''

      data.gradeList.map(item => {
        item.score = item.getTotal
        item.inspector = item.createByName
        item.inspectTime = item.createTime
      })

      this.checkCategories = data.gradeList

      data.starList.map((item, index) => {
        let arr = ['', '一星', '二星', '三星', '四星', '五星']
        item.name = arr[item.starLevel]
        if (item.starLevelId == params.starLevelId) { this.activeIndex = index }
      })
      this.starList = data.starList
    },
    //选择星级  1星不可选
    changeStar (item) {
      this.starData = item.name
      let params = this.$route.query
      params.starLevelId = item.starLevelId
      this._initData(params)
    },
    isIPhoneX () {
      let phone = this.phoneSize();
      if (phone === "iphonex") {
        this.top = "-5.86";
        this.starTop = '20'
        this.headerHeight = 29.5
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.details_wrapper {
  width: 100vw;
  box-sizing: border-box;
  height: 100vh;
  overflow: hidden;
  .details_header {
    width: 100vw;
    height: 35.33vw;
    position: relative;
    .star_nav {
      position: fixed;
      top: 25.5vw;
      left: 0;
      z-index: 1000;
      background: #f8f8f8;
      border-bottom: 1px solid #ececec;
      box-sizing: border-box;
    }
  }
  .details_content {
    width: 100vw;
    height: calc(100vh - 35.33vw);
    box-sizing: border-box;
    overflow: scroll;
    .line {
      height: 2.66vw;
      width: 100vw;
      background: #f5f5f5;
    }
  }
}
</style>