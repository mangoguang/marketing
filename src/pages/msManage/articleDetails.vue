<template>
  <div class="article">
    article
  </div>
</template>

<script>
import Vuex, { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      titleList: state => state.searchBox.titleList
    })
  },
  created() {
    console.log(123,this.titleList)
  }
}
</script>

<style lang="scss" scoped>

</style>
