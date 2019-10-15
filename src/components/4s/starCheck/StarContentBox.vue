<template>
  <div class="content">
    <div class="content-list"
         @click="bindSetLevelId(item.id)"
         v-for="(item) in categories"
         :key="item.id">
      <h2>{{item.name}}</h2>
      <BigCategory :subCategoryList="item.subCategoryList" />

    </div>
    <div class="no-data"
         v-if="categories.length==0">暂无数据</div>
  </div>
</template>

<script>
import BigCategory from '@/components/4s/starCheck/bigCategory'
import { gradeCategories } from '@/api/4s'
import { mapMutations } from 'vuex'
export default {
  components: {
    BigCategory
  },
  data() {
    return {
      categories: []
    }
  },
  created() {
    console.log(this.$attrs)
    this._getCategories(this.$route.query.shopId)
  },
  methods: {
    ...mapMutations(['setLevelId', 'setShopId']),
    async _getCategories(shopId) {
      let { code, categories, msg } = await gradeCategories({ shopId })
      this.categories = categories || []
    },
    //保存几星检查
    bindSetLevelId(levelId) {
      this.setLevelId(levelId)
      this.setShopId(this.$route.query.shopId)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  .content-list {
    border-bottom: 1px solid #ebebeb;
    padding-bottom: 27px;
    & > h2 {
      color: #363636;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      line-height: 1;
      padding-top: 23px;
      padding-bottom: 27px;
    }
  }
  .no-data {
    color: #999;
    font-size: 14px;
    text-align: center;
    line-height: 50px;
  }
}
</style>
