<!--  -->
<template>
  <div class="judge_header">
    <judge-header :title="'评星结果'">
      <egg-sort />
      <egg-filter />
      <!-- <egg-searchBox @click.native="toSearchIndex"/> -->
    </judge-header>
  </div>
</template>

<script>
import judgeHeader from '../record/header'
import eggSort from '../filter/sort'
import eggFilter from '../filter/filter'
import eggSearchBox from '../search/searchBox'

export default {
  components: {
    judgeHeader,
    eggSort,
    eggFilter,
    eggSearchBox
  },
  data () {
    return {

    };
  },
  methods: {
    // toSearchIndex() {
    //   this.$router.push({
    //     name: 'searchIndex'
    //   })
    // }
  }
}
</script>
<style lang='scss' scoped>

</style>