<!--  -->
<template>
  <div class="starFilter" >
    <div class="filterIcon">
      <egg-filter-icon :filterText="'筛选'" 
                        @click.native="handleCloseClick"/>
    </div>
    <div class="filterContent" v-show="status" @click.self="handleCloseClick">
      <egg-filter-content @getVal="getVal"/>
    </div>
  </div>
</template>

<script>
import eggFilterIcon from './filterItem'
import eggFilterContent from './filterContent'
export default {
  components: {
    eggFilterIcon,
    eggFilterContent
  },
  data () {
    return {
      status: false,
      filterData: {}
    };
  },
  methods: {
    handleCloseClick() {
      this.status = !this.status
    },
    getVal(val) {
      this.status = !this.status
      if(this.filterData.activeIndex === val.activeIndex) {
        return
      }
      console.log(val)
      this.filterData = val
    }
  }

}
</script>
<style lang='scss' scoped>
.filterIcon {
  position: absolute;
  bottom: 0;
  left: 40.86vw;
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
</style>