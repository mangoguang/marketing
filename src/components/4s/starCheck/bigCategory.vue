<!-- status参数为真时表示已评分 -->
<template>
  <div class="bigCategory">
    <BigCategoryBox v-for="(item, index) in categories"
                    @click.native="$router.push({ path: '/check' ,query:{id:$route.query.id}})"
                    :key="index"
                    :status="item.status"
                    :text="item.name" />
  </div>
</template>

<script>
import BigCategoryBox from './bigCategoryBox'
import { secondcategories } from '@/api/4s'
export default {
  props: [],
  components: { BigCategoryBox },
  data () {
    return {
      categories: []
    }
  },
  async created () {
    let { code, categories } = await secondcategories({ id: this.$route.query.id })
    categories.map((item, index) => {
      if (index == 0) {
        this.$set(item, 'status', true)
      } else {
        this.$set(item, 'status', false)
      }
    })
    this.categories = categories
  },
  methods: {
    // toCheck () {
    //   this.$router.push({ path: '/check' })
    // }
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