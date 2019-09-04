<!--  -->
<template>

  <div class="atest_filter">
    <div class="sort">
      <egg-sort-icon @click.native="handleSortClick"
                     :sortText="sortText"
                     :changeStatus="changeStatus" />
      <div class="sortContentWrapper"
           v-show="sortStatus"
           :style="{'top':`${top}vw`}">
        <egg-sort-content @selectIndex="selectIndex"
                          :list="list" />
      </div>
    </div>
    <div class="filter"
         v-show="!sortStatus">
      <egg-filter-icon @click.native="handleCloseClick" />
      <div class="filterContent"
           v-show="filterStatus"
           @click.self="handleCloseClick">
        <egg-filter-content @getVal="getFilterVal" />
      </div>
    </div>
  </div>

</template>

<script>
import eggSortIcon from './sortIcon'
import eggFilterIcon from './filterIcon'
import eggSortContent from '../filter/sortContent'
import eggFilterContent from './filterContent'

export default {
  components: {
    eggSortIcon,
    eggSortContent,
    eggFilterIcon,
    eggFilterContent
  },
  data () {
    return {
      list: ['申请时间升序', '申请时间降序'],
      sortSelectData: {},
      sortText: '申请时间升序',
      sortStatus: false,
      filterStatus: false,
      top: ''
    };
  },
  computed: {
    changeStatus () {
      return this.sortSelectData
    }
  },
  created () {
    this.isIPhoneX()
  },
  methods: {
    //点击排序按钮
    handleSortClick () {
      this.sortSelectData = JSON.parse(JSON.stringify(this.sortSelectData))
      this.sortStatus = !this.sortStatus
    },
    //排序选择的数据
    selectIndex (val) {
      console.log(val)
      this.sortSelectData = val       //选择的数据
      const { index } = val
      this.sortText = this.list[index]
      this.sortStatus = !this.sortStatus
      var dec = val.index == 0 ? 'desc' : 'asc'
      this.$emit('onDesc', dec)
    },
    getFilterVal (val) {
      console.log(val)
      this.filterStatus = !this.filterStatus
      if (val.situationActiveIndex == -1 && val.starActiveIndex == -1) {
        this.$emit('onFilterReset')
        return
      }
      this.$emit('onFilterData', val)
    },
    handleCloseClick () {
      this.filterStatus = !this.filterStatus

    },
    isIPhoneX () {
      let phone = this.phoneSize();
      if (phone === "iphonex") {
        this.top = "41.3";
      }
    }

  }
}
</script>
<style lang='scss' scoped>
.atest_filter {
  width: 100vw;
  height: 11.73vw;
  background: #fff;
  display: flex;
  align-items: center;
  color: #363636;
  font-size: 4vw;
  justify-content: space-between;
  padding: 0 24px;
  box-sizing: border-box;
  position: fixed;
  top: 94px;
  left: 0;
  z-index: 1;
  .sortContentWrapper {
    position: fixed;
    top: 138px;
    left: 0;
    background: rgba($color: #000, $alpha: 0.3);
    z-index: 99;
  }
  .filterContent {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background: rgba($color: #000, $alpha: 0.3);
    z-index: 999;
  }
}
</style>