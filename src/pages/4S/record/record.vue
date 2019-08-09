<!-- 检查记录 -->
<template>
  <div class="record"
       :style="{'margin-top':`${top}vw`}">
    <div class="header"
         :style="{'height':`${headerHeight}vw`}">
      <recordHeader :title="'检查记录'">
        <egg-nav-filter class="nav_filter"
                        @filterVal="filterVal" />
        <div class="shopText">{{$route.query.shopName}}</div>
      </recordHeader>
    </div>
    <div class="record_content"
         :style="{'margin-top':`${top}vw,height:${height}`}">
      <div class="new_record">
        <recordCard :checkLogs="checkLogs" />
      </div>
      <!-- <div class="pre_record">
        <p class="pre_text">历史记录</p>
        <recordCard class="recordCard"/>
        <recordCard class="recordCard"/>
      </div> -->
    </div>
  </div>
</template>

<script>
import recordHeader from '@/components/4s/record/header'
import recordCard from '@/components/4s/record/record_card'
import eggNavFilter from '@/components/4s/record/nav_filter'
import { Toast } from 'mint-ui'
import { checklogs } from '@/api/4s'
export default {
  components: {
    recordHeader,
    recordCard,
    eggNavFilter
  },
  data () {
    return {
      top: '',
      headerHeight: '',
      height: '',
      shopId: '',
      checkLogs: []
    };
  },
  created () {
    this.shopId = this.$route.query.shopId
    this._getDataList({ shopId: this.shopId })
  },
  mounted () {
    this.isIPhoneX()
  },
  methods: {
    filterVal (val) {
      let pass = ''
      if (val == '及格') {
        pass = 1
      } else if (val == '不及格') {
        pass = 0
      }
      let params = {
        shopId: this.shopId,
        pass
      }
      this._getDataList(params)
    },
    isIPhoneX () {
      let phone = this.phoneSize();
      if (phone === "iphonex") {
        this.top = "-5.86";
        this.headerHeight = 29.5
      }
    },
    async  _getDataList (params) {
      let { code, checkLogs, msg } = await checklogs(params)
      if (code != 0) {
        Toast(msg)
        return
      }
      checkLogs.map(item => {
        item.sTime = item.startTime.split(' ')[0]
        item.eTime = item.endTime.split(' ')[0]
        item.pass == 0 ? item.passVal = '不及格' : '及格'
      })
      this.checkLogs = checkLogs
    }
  }
}
</script>
<style lang='scss' scoped>
.record {
  background: #fff;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  .header {
    width: 100vw;
    height: 35.33vw;
    .shopText {
      max-width: 180px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      position: absolute;
      right: 6.4vw;
      bottom: 3vw;
      color: rgba($color: #fff, $alpha: 0.5);
      font-weight: 500;
      font-size: 3.46vw;
    }
    .nav_filter {
      position: absolute;
      left: 6.4vw;
      bottom: 1vw;
    }
  }
  .record_content {
    width: 100vw;
    height: calc(100vh - 35.33vw);
    box-sizing: border-box;
    overflow: scroll;
    padding: 0 2.13vw;
    box-sizing: border-box;
    text-align: center;
    font-size: 3.2vw;
    line-height: 10.66vw;
    padding-top: 3.33vw;
    .pre_record {
      width: 100%;

      .pre_text {
        position: relative;
        &::before {
          content: "";
          position: absolute;
          display: block;
          width: 40vw;
          height: 100%;
          border-top: 1px solid #ececec;
          left: 0;
          top: 50%;
        }
        &::after {
          content: "";
          position: absolute;
          display: block;
          width: 40vw;
          height: 100%;
          border-top: 1px solid #ececec;
          right: 0;
          top: 50%;
        }
      }
    }
    .recordCard {
      margin-bottom: 4vw;
    }
  }
}
</style>