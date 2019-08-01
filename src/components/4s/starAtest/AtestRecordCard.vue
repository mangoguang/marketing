<!--  -->
<template>
  <div class="apply-list">
    <atest-filter @onFilterData="onFilterData"
                  @onFilterReset="onFilterReset"
                  @onDesc="onDesc" />
    <mt-loadmore :top-method="loadTop"
                 :bottom-method="loadBottom"
                 :bottom-all-loaded="allLoaded"
                 ref="loadmore"
                 :autoFill="false"
                 :bottomDistance="30">
      <div class="atest_record_card"
           v-for="(item,index) in comDataList"
           :key="index">
        <div class="header">
          <div class="via">
            <img src="../../../assets/imgs/4s/via.png"
                 alt="">
          </div>
          <div class="message">
            <p class="name">{{item.distributor}}</p>
            <p class="level">认证星级：{{item.approveLevel}}</p>
          </div>
          <div class="date">
            <span>{{item.createTime}}</span>
          </div>
        </div>
        <div class="status">
          <p class="turnBack"
             v-if="item.status==1"
             @click="handleBackout(item.id)">撤销</p>
          <p class="pass"
             :class="{'red':item.status==2,'ok':item.status==7}">{{item.statusString}}</p>
        </div>
        <div class="score_wrapper border-bottom">
          <div class="score_box">
            <div class="wrapper">
              <span class="text">门店评分：</span>
              <span class="score">82</span>
            </div>
            <div class="wrapper">
              <span class="text">区域评分：</span>
              <span class="score">82</span>
            </div>
            <div class="wrapper">
              <span class="text">4s评分：</span>
              <span class="score">82</span>
            </div>
          </div>
          <div class="score_box"
               v-if="item.status==2">
            <span class="text">退回原因：不符合规范</span>
          </div>
        </div>
      </div>
    </mt-loadmore>
    <div class="no-data"
         v-if="noData">暂无数据</div>
    <TipsBox @getTipsVal="getTipsVal"
             v-show="tipsStatus"
             :tipsData="tipsData" />
  </div>
</template>

<script>
import AtestFilter from '@/components/4s/starAtest/AtestFilter'
import TipsBox from '@/components/4s/tipsBox/tipsBox'
import { Loadmore, Toast } from 'mint-ui';
import Vue from 'vue'
Vue.component(Loadmore.name, Loadmore);
import { distributorApplys, distributorCancel } from '@/api/4s'
import { parseTime, geMonthLastDay } from '@/utils/tools.js'

export default {
  components: {
    AtestFilter,
    TipsBox
  },
  data () {
    return {
      allLoaded: false,
      dataList: [],
      params: {
        page: 1,
        limit: 10,
        starLevel: 1,
        status: 1,
        startDate: parseTime(new Date(), '{y}-{m}') + '-01',
        endDate: parseTime(geMonthLastDay(), '{y}-{m}-{d}'),
        sort: 'desc'
      },
      level: ['一星', '二星', '三星', '四星', '五星'],
      status: ['已申请', '已退回', '已撤销', '已受理', '已评分', '未通过', '认证通过'],
      noData: false,
      tipsStatus: false, //弹窗
      tipsData: { //弹窗内容
        imgUrl: './static/images/4s/warn.png',
        title: '提示',
        btn: 'confrim',
        content: '今日撤销已达到三次上限，无法再次操作撤销'
      }
    };
  },
  created () {
    this._initData(this.params)

  },
  computed: {
    comDataList () {
      let list = this.dataList

      list.map(item => {
        item.approveLevel = this.level[item.approveLevel - 1] || '未知'
        item.statusString = this.status[item.status - 1] || '未知'
      })
      return list
    }
  },
  methods: {
    getTipsVal () {
      this.tipsStatus = !this.tipsStatus
    },
    //撤销申请
    async  handleBackout (id) {
      let { code, msg, data } = await distributorCancel({ id })
      if (code != 0) {
        this.tipsStatus = !this.tipsStatus
        return
      }
      Toast(msg)
    },
    //排序
    onDesc (val) {
      this.params.sort = val
      this._initData(this.params)
    },
    //重置筛选
    onFilterReset () {
      this.params = {
        page: 1,
        limit: 10,
        starLevel: 1,
        status: 1,
        startDate: '2019-06-01',
        endDate: '2019-07-30',
        sort: 'desc'
      }
      this._initData(this.params)
    },
    //筛选条件
    onFilterData (data) {
      var status = data.handleList[data.situationActiveIndex]
      var level = data.starlist[data.starActiveIndex]
      this.params = {
        page: 1,
        limit: 10,
        starLevel: this.level.indexOf(level) + 1,
        status: this.status.indexOf(status) + 1,
        startDate: data.startDay,
        endDate: data.endDay,
        sort: 'desc'
      }
      this._initData(this.params)
    },
    //上拉刷新
    loadTop () {
      this.params.page = 1;
      this._initData(this.params)
      this.$refs.loadmore.onTopLoaded();
    },
    //下拉加载更多
    loadBottom () {
      this.params.page++
      this._initData(this.params)
      this.allLoaded = true;// 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    },
    //加载列表数据
    async  _initData (params) {
      let { data } = await distributorApplys(params)
      if (data.totalPage == 1) {
        this.allLoaded = true
      }
      this.dataList = data.list
      if (params.page == 1 && data.list.length == 0) {
        this.noData = true
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.no-data {
  text-align: center;
  font-size: 12px;
  color: #999;
  padding-top: 20px;
}
.atest_record_card {
  width: 91.46vw;
  // height: 35.33vw;
  margin: 0 auto;
  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 5.06vw;
    .via {
      flex: 0.15;
      img {
        width: 12vw;
        height: auto;
      }
    }
    .message {
      flex: 0.55;
      .name {
        color: #363636;
        font-size: 5.06vw;
        font-weight: bold;
        line-height: 1.3em;
      }
      .level {
        color: #363636;
        font-size: 4vw;
        font-weight: 500;
      }
    }
    .date {
      flex: 0.25;
      color: #666;
      font-size: 3.2vw;
    }
  }
  .status {
    width: 100%;
    font-size: 4vw;
    font-weight: 500;
    display: flex;
    justify-content: flex-end;
    padding-bottom: 1.2vw;
    box-sizing: border-box;
    align-items: center;
    .pass {
      color: #007aff;
    }
    .red {
      color: #ff2d55;
    }
    .ok {
      color: #4cd964;
    }
    .turnBack {
      text-align: center;
      color: #ff2d55;
      width: 18.66vw;
      line-height: 8vw;
      border-radius: 4vw;
      background: rgba($color: #ff2d55, $alpha: 0.3);
      margin-right: 5.73vw;
    }
  }
  .score_wrapper {
    padding-bottom: 1.4vw;
  }
  .score_box {
    display: flex;
    border-radius: 1.2vw;
    background: #f0f0f0;
    line-height: 6.4vw;
    font-size: 3.73vw;
    margin-bottom: 1.2vw;
    .text {
      color: #666;
      padding-left: 2vw;
      box-sizing: border-box;
    }
    .score {
      color: #ff2d55;
      font-weight: bold;
      margin-right: 2vw;
    }
  }
}
.unpass {
  color: #ff2d55;
}
.comfirm {
  color: #4cd964;
}
</style>