<template>
  <div class="case">
    <filter-bar @onChangeList="onChangeList"
                @onOrderType="onOrderType"
                :listStyle="listStyle"></filter-bar>
    <div class="load-more"
         v-if="dataList.length!=0">
      <mt-loadmore :bottom-method="loadBottom"
                   :bottom-all-loaded="allLoaded"
                   ref="loadmore">
        <div class="list">
          <list :listStyle="listStyle"
                v-for="(item,index) in dataList"
                @click.native="$router.push({path:'/detail',query:{id:item.id}})"
                :item="item"
                :key="index"></list>
          <div class="no-more"
               v-if="allLoaded">- 到底了 -</div>

        </div>
      </mt-loadmore>
    </div>
    <div class="no-data"
         v-else>暂无记录</div>
  </div>
</template>
<script>
import FilterBar from './components/FilterBar'
import List from '@/components/case/List/Index'
import { goodCaseList, getIpCity } from '@/api/case'
import { mapState, mapMutations } from 'vuex'
import Bus from '@/utils/Bus'
export default {
  components: {
    FilterBar,
    List
  },
  data() {
    return {
      // listStyle: 'cell-box',
      params: {
        source: '',
        orderType: 1,
        page: 1
      },
      dataList: [],
      allLoaded: false
    }
  },
  async created() {
    if (this.provice) {
      this.params.source = this.provice
    } else {
      let res = await getIpCity({ ip: returnCitySN.cip })
      this.params.source = '深圳'
      this.setProvice('深圳')
    }
    this._initData(this.params)
  },
  mounted() {
    Bus.$on('onDoneSelect', val => {
      let params = Object.assign(this.params, val)
      this._initData(params)
    })
  },
  computed: {
    ...mapState({
      listStyle: state => state.caseStore.listStyle,
      provice: state => state.caseStore.provice
    })
  },
  methods: {
    ...mapMutations(['setListStyle']),
    loadBottom() {
      let { params } = this
      this.params.page += 1
      this._initData(this.params)
    },
    onChangeList(val) {
      let style = val ? 'cell-list' : 'cell-box'
      this.setListStyle(style)
    },
    onOrderType(type) {
      this.params.orderType = type
      this._initData(this.params)
    },
    async _initData(params) {
      let { page } = await goodCaseList(params)
      if (page.totalPage == params.page) {
        this.allLoaded = true
      }
      if (params.page == 1) {
        this.dataList = page.list
      } else {
        this.dataList = this.dataList.concat(page.list)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.no-data {
  text-align: center;
  font-size: 14px;
  color: #999;
  padding: 20px;
}
.load-more {
  overflow: scroll;
  height: 100vh;
}
.list {
  display: flex;
  flex-flow: wrap;
  padding: 0 10px;
  margin-top: 12px;
  width: 100%;
  // min-height: 100vh;
  // overflow: hidden;
  .cell-box {
    margin-right: 10px;
    margin-bottom: 12px;
    &:nth-child(2n) {
      margin-right: 0;
    }
  }
}
</style>