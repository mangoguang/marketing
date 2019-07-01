<!--  -->
<template>
  <div class="starSort">
    <div class="sortIcon">
      <filter-icon  :filterText="'排序'" 
                    :changeStatus="changeStatus"
                    @click.native="handleClick"/>
    </div>
    <div class="sortContentWrapper" v-show="status">
      <sort-content @selectIndex="selectIndex"/>
    </div>
  </div>
</template>

<script>
import filterIcon from './filterIcon'
import sortContent from './sortContent'

export default {
  components: {
    filterIcon,
    sortContent
  },
  data () {
    return {
      selectData: {},
      status: false
    };
  },
  computed: {
    changeStatus() {
      return this.selectData  
    }
  },
  methods: {
    handleClick() {
      this.selectData = {}
    },
    selectIndex(val) {
      this.selectData = val
    }
  }
}
</script>
<style lang='scss' scoped>
.sortIcon {
  width: 11vw;
  position: absolute;
  bottom: 0;
  left: 11.86vw;
}
.sortContentWrapper {
  position: absolute;
  bottom: -31.73vw;
  left: 0;
}
</style>