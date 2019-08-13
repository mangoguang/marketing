<!--  -->
<template>
  <div class="record"
       :style="{'margin-top':`${top}vw`}">
    <div class="header"
         :style="{'height':`${headerHeight}vw`}">
      <recordHeader :title="'检查记录'" />
    </div>
    <div v-if="dataList.length!=0"
         class="record_content"
         :style="{'margin-top':`${top}vw,height:${height}`}">
      <record-jxs-card v-for="(item,index) in dataList"
                       :key="index"
                       :item="item"
                       @onToggleMore="onToggleMore"
                       :parentIndex="index" />
    </div>
    <div v-else
         class="no-data">暂无数据</div>
  </div>
</template>

<script>
import recordHeader from '../../../components/4s/record/header'
import recordJxsCard from '../../../components/4s/record/recordJxs_card'
import { Toast } from 'mint-ui'
import { distributorshops } from '@/api/4s'
export default {
  components: {
    recordHeader,
    recordJxsCard
  },
  data () {
    return {
      top: '',
      height: '',
      headerHeight: '',
      dataList: [] //检查记录列表
    };
  },
  created () {
    this._initData()
  },
  mounted () {
    this.isIPhoneX()
  },
  methods: {
    isIPhoneX () {
      let phone = this.phoneSize();
      if (phone === "iphonex") {
        // this.top = "-5.86";
        // this.headerHeight = 29.5
      }
    },
    async  _initData () {
      let { code, distributorShops, msg } = await distributorshops()
      if (code != 0) {
        Toast(msg)
        return
      }
      distributorShops.map(item => {
        item.more = false
      })
      this.dataList = distributorShops
    },
    onToggleMore (index) {
      this.dataList[index].more = !this.dataList[index].more
    }
  }
}
</script>
<style lang='scss' scoped>
.no-data {
  font-size: 14px;
  color: #999;
  text-align: center;
  line-height: 50px;
}
.record {
  background: #f8f8f8;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  .header {
    width: 100vw;
    padding-top: 93px;
    /deep/ .record_header {
      height: auto;
      padding-bottom: 5px;
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
  }
}
</style>