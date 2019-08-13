<!-- status参数为真时表示已评分 -->
<template>
  <div class="bigCategory">
    <BigCategoryBox v-for="(item, index) in subCategoryList"
                    @click.native="bindNavigatorCheck(item)"
                    :key="index"
                    :status="item.status"
                    :isGrade="item.isGrade"
                    :text="item.name" />
  </div>
</template>

<script>
import BigCategoryBox from './bigCategoryBox'
import { secondcategories } from '@/api/4s'
import { mapGetters } from 'vuex'
export default {
  props: ['subCategoryList'],
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
      this.$router.push({ path: '/check', query: { id: item.id, name: item.name, shopId: this.$route.query.shopId, isGrade: item.isGrade } })
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
  margin-top: 0;
  padding: 0 18px;
}
</style>