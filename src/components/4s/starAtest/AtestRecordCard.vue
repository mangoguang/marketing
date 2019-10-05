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
      <div class="ul"
           style="min-height:80vh;">
        <div class="atest_record_card"
             v-for="(item,index) in comDataList"
             :key="index"
             @click="bindApproveFlowInfo(item)">
          <div class="header">
            <div class="via">
              <img src="../../../assets/imgs/4s/via.png"
                   alt="">
            </div>
            <div class="message">
              <p class="name">{{item.distributor}}</p>
              <p class="level">认证星级：{{item.approveLevelStr}}</p>
            </div>
            <div class="date">
              <span>{{item.createTime}}</span>
            </div>
          </div>
          <div class="status">
            <p class="turnBack"
               v-if="item.status==1"
               @click.stop="handleBackout(item.id)">撤销</p>
            <p class="pass"
               :class="item.color">{{item.statusString}}</p>
          </div>
          <div class="score_wrapper border-bottom">
            <div class="score_box">
              <div class="wrapper"
                   v-if="item.scoreShop">
                <span class="text">门店评分：</span>
                <span class="score">{{item.scoreShop||'-'}}</span>
              </div>
              <div class="wrapper"
                   v-if="item.scoreRegion">
                <span class="text">区域评分：</span>
                <span class="score">{{item.scoreRegion||'-'}}</span>
              </div>
              <div class="wrapper"
                   v-if="item.scoreCertification">
                <span class="text">4s评分：</span>
                <span class="score">{{item.scoreCertification||'-'}}</span>
              </div>
            </div>
            <div class="score_box"
                 v-if="item.status==2">
              <span class="text">{{item.remark||'-'}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="no-data"
           v-if="noData">暂无数据</div>
    </mt-loadmore>

    <TipsBox @onComfim="onComfim"
             @onCancel="onCancel"
             v-show="tipsStatus"
             :tipsData="tipsData" />
    <node-card v-if="showNodeCard"
               :cofirmList="cofirmList"
               :status="status"
               comfirmTitle="认证进度"
               @onNodeCardClose="showNodeCard=false" />
  </div>
</template>

<script>
import AtestFilter from '@/components/4s/starAtest/AtestFilter'
import TipsBox from '@/components/4s/tipsBox/tipsBox'
import NodeCard from '@/components/4s/judgeStar/node_card'
import { Loadmore, Toast } from 'mint-ui'
import Vue from 'vue'
Vue.component(Loadmore.name, Loadmore)
import {
  distributorLogList,
  distributorCancel,
  getApproveFlowInfo
} from '@/api/4s'
import { parseTime, geMonthLastDay } from '@/utils/tools.js'

export default {
  components: {
    AtestFilter,
    TipsBox,
    NodeCard
  },
  data() {
    return {
      allLoaded: false,
      dataList: [],
      params: {
        page: 1,
        limit: 10,
        // starLevel: 1,
        // status: 1,
        // startDate: parseTime(new Date(), '{y}-{m}') + '-01',
        // endDate: parseTime(geMonthLastDay(), '{y}-{m}-{d}'),
        sort: 'desc'
      },
      level: ['一星', '二星', '三星', '四星', '五星'],
      status: [
        { name: '已申请', color: 'blue' },
        { name: '已退回', color: 'red' },
        { name: '已撤销', color: 'red' },
        { name: '区域经理已受理', color: 'blue' },
        { name: '区域经理已评分', color: 'ok' },
        { name: '区域经理未通过', color: 'red' },
        { name: '区域经理发起认证', color: 'blue' },
        { name: '4s已受理', color: 'ok' },
        { name: '4s已评分', color: 'ok' },
        { name: '4s未通过', color: 'red' },
        { name: '4s发起认证', color: 'blue' },
        { name: '总部认证通过', color: 'ok' },
        { name: '总部认证未通过', color: 'red' }
      ],
      noData: false,
      tipsStatus: false, //弹窗
      tipsData: {
        //弹窗内容
        imgUrl: './static/images/4s/warn.png',
        title: '提示',
        btn: 'confrim',
        content: '今日撤销已达到三次上限，无法再次操作撤销'
      },
      showNodeCard: false, //认证进度弹窗
      cofirmList: [],
      activeId: 0,
      comfirmTitle: ''
    }
  },
  created() {
    let searchVal = this.$route.query.searchVal
    if (searchVal) {
      this.params.key = searchVal
      this._initData(this.params)
    } else {
      this._initData(this.params)
    }
  },
  computed: {
    comDataList() {
      let list = this.dataList

      list.map(item => {
        item.approveLevelStr = this.level[item.approveLevel - 1] || '-'
        item.statusString =
          (this.status[item.status - 1] &&
            this.status[item.status - 1]['name']) ||
          '未知'
        if (item.status == 2 && item.rejectType == 2) {
          item.statusString = '区域已退回'
        }
        if (item.status == 2 && item.rejectType == 3) {
          item.statusString = '4s已退回'
        }
        item.color =
          (this.status[item.status - 1] &&
            this.status[item.status - 1]['color']) ||
          'blue'
      })
      return list
    }
  },
  methods: {
    async bindApproveFlowInfo(item) {
      let { id, statusString, approveLevel } = item
      this.comfirmTitle = statusString
      let { code, data } = await getApproveFlowInfo({ qualificationId: id })

      let {
        typeList1,
        typeList2,
        typeList3,
        typeList4,
        typeList5,
        typeList6,
        typeList7,
        typeList8
      } = data
      let list4 = [...typeList4, ...typeList5, ...typeList6, ...typeList7]

      let res = list4.map(item => item.status == 1 || item.status == 3)
      // debugger res.length == 4 &&
      // console.log(Array.from(new Set(res)))
      // Array.from(new Set(res)).length == 1 &&
      //   Array.from(new Set(res))[0] == true
      let lastList = typeList8[0] || {}
      if (lastList.status == 3) {
        list4[list4.length - 1].statusString = '已通过'
        list4 = [list4[list4.length - 1]]
      } else {
        // console.log(res.indexOf(false))
        if (res.length != 0 && res.indexOf(false) != -1) {
          list4[res.indexOf(false)].statusString = '未通过'
          list4 = [list4[res.indexOf(false)]]
        } else {
          list4 = []
        }
      }

      data = {
        typeList1,
        typeList2,
        typeList3,
        typeList4: list4,
        typeList8
      }

      let cofirmList = Object.keys(data).map((key, index) => {
        var passFail = false
        data[key].map((item, idx) => {
          passFail = [1, 4, 5, 7, 8, 9, 11, 12].indexOf(item.status) != -1
          if (item.type > 3 && (item.status == 1 || item.status == 3)) {
            passFail = true
          }
        })
        return { typeList: data[key], passFail }
      })

      if (approveLevel <= 2) {
        cofirmList.splice(2, 1)
      }

      this.cofirmList = cofirmList
      this.showNodeCard = true
    },
    async onComfim(val) {
      this.tipsStatus = !this.tipsStatus
      if (val == 'cancel') {
        let { code, msg, data } = await distributorCancel({ id: this.activeId })
        if (code != 0) {
          this.tipsStatus = !this.tipsStatus
          this.tipsData = {
            //弹窗内容
            imgUrl: './static/images/4s/warn.png',
            title: '提示',
            btn: 'confrim',
            content: msg
          }
          return
        } else {
          this._initData(this.params)
        }
        Toast(msg)
      }
    },
    onCancel() {
      this.tipsStatus = !this.tipsStatus
    },
    //撤销申请
    async handleBackout(id) {
      this.tipsData = {
        //弹窗内容
        imgUrl: './static/images/4s/warn.png',
        title: '撤销',
        btn: 'cancel',
        content:
          '撤销申请后，需重新填写资料申请 《星级认证》，多次重复操作，系统将 限制时间申请，请谨慎操作。 是否确定撤销？'
      }
      this.tipsStatus = !this.tipsStatus
      this.activeId = id
    },
    //排序
    onDesc(val) {
      this.params.sort = val
      this._initData(this.params)
    },
    //重置筛选
    onFilterReset() {
      this.params = {
        page: 1,
        limit: 10,
        // starLevel: 1,
        // status: 1,
        // startDate: parseTime(new Date(), '{y}-{m}') + '-01',
        // endDate: parseTime(geMonthLastDay(), '{y}-{m}-{d}'),
        sort: 'desc'
      }
      this._initData(this.params)
    },
    //筛选条件
    onFilterData(data) {
      var status = data.situationActiveIndex + 1
      var level = data.starlist[data.starActiveIndex]
      this.params = {
        page: 1,
        limit: 10,
        starLevel: this.level.indexOf(level) + 1,
        status,
        startDate: data.startDay,
        endDate: data.endDay,
        sort: 'desc'
      }
      this._initData(this.params)
    },
    //上拉刷新
    loadTop() {
      // this.params.page = 1
      this._initData({
        page: 1,
        limit: 10,
        sort: 'desc'
      })
      this.allLoaded = false
      this.$refs.loadmore.onTopLoaded()
    },
    //下拉加载更多
    loadBottom() {
      this.params.page++
      this._initData(this.params)
      // this.allLoaded = true;// 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded()
    },
    //加载列表数据
    async _initData(params) {
      let { data } = await distributorLogList(params)
      if (data.totalPage == 1 || data.totalPage == params.page) {
        this.allLoaded = true
      }

      if (params.page > 1) {
        this.dataList = this.dataList.concat(data.list)
      } else {
        this.dataList = data.list
      }

      if (params.page == 1 && data.list.length == 0) {
        this.noData = true
        this.allLoaded = true
      } else {
        this.noData = false
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.apply-list {
  overflow: hidden;
  padding-top: 44px;
  position: relative;
}
.no-data {
  text-align: center;
  font-size: 12px;
  color: #999;
  padding-top: 20px;
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;
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
      background: rgba(0, 122, 255, 0.3);

      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      padding: 0 10px;
    }
    .red {
      color: #ff2d55;
      background: rgba(255, 45, 85, 0.3);
    }
    .ok {
      color: #4cd964;
      background: rgba(76, 217, 100, 0.3);
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