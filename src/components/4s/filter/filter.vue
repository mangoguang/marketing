<!--  -->
<template>
  <div class="starFilter">
    <div class="sortIcon">
      <filter-icon :filterText="'筛选'"
                    />
    </div>
  </div>
</template>

<script>
import filterIcon from './filterItem'

export default {
  components: {
    filterIcon
  },
  data () {
    return {
    };
  }

}
</script>
<style lang='scss' scoped>
.sortIcon {
  position: absolute;
  bottom: 0;
  left: 40.86vw;
}
</style>