<!-- status参数为真时表示已评分 -->
<template>
  <div class="bigCategory">
    <BigCategoryBox v-for="(item, index) in categories"
                    @click.native="bindNavigatorCheck(item)"
                    :key="index"
                    :status="item.status"
                    :text="item.name" />
  </div>
</template>

<script>
import BigCategoryBox from './bigCategoryBox'
import { secondcategories } from '@/api/4s'
import { mapGetters } from 'vuex'
export default {
  props: [],
  components: { BigCategoryBox },
  data () {
    return {
      categories: [],
      categoryList: []
    }
  },
  async created () {
    this.categories = this.getCategories()
  },
  methods: {
    ...mapGetters(['getCategories']),
    bindNavigatorCheck (item) {
      this.$router.push({ path: '/check', query: { id: item.id, name: item.name } })
    }
  }
}
</script>
<style lang='scss' scoped>
.bigCategory {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  // padding: 0 2vw;
  margin-top: 6vw;
}
</style>