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
    console.log(123,this.titleList);
     //获取收藏列表文章路由"/collectList"传过来的文章articleId
    console.log(this.$route.params.articleId);
  }
}
</script>

<style lang="scss" scoped>

</style>
