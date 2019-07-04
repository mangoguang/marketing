<!--  -->
<template>
  <div class="starSort">
    <div class="sortIcon">
      <egg-filter-icon  :filterText="sortText" 
                        :changeStatus="changeStatus"
                        @click.native="handleClick"/>
    </div>
    <div  class="sortContentWrapper" 
          :style="{'top':`${top}vw`}"
          v-show="status">
      <egg-sort-content @selectIndex="selectIndex"
                        :list="list"/>
    </div>
  </div>
</template>

<script>
import eggFilterIcon from './filterItem'
import eggSortContent from './sortContent'

export default {
  components: {
    eggFilterIcon,
    eggSortContent
  },
  data () {
    return {
      selectData: {},
      status: false,
      sortText: '检查时间升序',
      list: ['检查时间升序','检查时间降序'],
      top:''
    };
  },
  computed: {
    changeStatus() {
      return this.sortSelectData  
    }
  },
  created() {
    this.isIPhoneX()
  },
  methods: {
    handleClick() {
      this.sortSelectData = {}
      this.status = !this.status
    },
    selectIndex(val) {
      this.sortSelectData = val       //选择的数据
      const {index} = val
      this.sortText = this.list[index]
      this.status = !this.status
    },
    isIPhoneX() {
      let phone = this.phoneSize();
      if (phone === "iphonex") {
        this.top = "29";
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.sortIcon {
  position: absolute;
  bottom: 0;
  left: 11.86vw;
}
.sortContentWrapper {
  position: fixed;
  top: 35.31vw;
  left: 0;
  background: rgba($color: #000, $alpha: 0.3);
}
</style>