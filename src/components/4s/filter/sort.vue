<!--  -->
<template>
  <div class="starSort">
    <div class="sortIcon">
      <filter-icon  :filterText="sortText" 
                    :changeStatus="changeStatus"
                    @click.native="handleClick"/>
    </div>
    <div  class="sortContentWrapper" 
          :style="{'top':`${top}vw`}"
          v-show="status">
      <sort-content @selectIndex="selectIndex"/>
    </div>
  </div>
</template>

<script>
import filterIcon from './filterItem'
import sortContent from './sortContent'

export default {
  components: {
    filterIcon,
    sortContent
  },
  data () {
    return {
      selectData: {},
      status: false,
      sortText: '检查时间升序',
      top:''
    };
  },
  computed: {
    changeStatus() {
      return this.selectData  
    }
  },
  created() {
    this.isIPhoneX()
  },
  methods: {
    handleClick() {
      this.selectData = {}
      this.status = !this.status
    },
    selectIndex(val) {
      this.selectData = val       //选择的数据
      const {index, list} = val
      this.sortText = list[index]
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