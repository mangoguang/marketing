<!--  -->
<template>
  <ul class="recordContent">
    <rec-conten v-for="(item, index) in checkCategories"
                :key="item + index"
                @click.native="toCheckDetails(item)"
                :item="item" />
  </ul>
</template>

<script>
import RecConten from './content'
export default {
  components: {
    RecConten
  },
  props: ['checkCategories'],
  data () {
    return {
      list: [1, 2, 3, 4, 5]
    };
  },
  methods: {
    toCheckDetails (item) {
      let query = this.$route.query
      query.name = item.name
      query.categoryId = item.categoryId
      query.total = item.total
      this.$router.push({
        name: 'itemDetails',
        query
      })
    }
  }
}
</script>
<style lang='scss' scoped>
</style>