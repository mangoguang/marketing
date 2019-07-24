<!--  -->
<template>
  <div class="dailyCheck">
    <ContentBox class="wrapper"
                :title="'日常检查'">
      <div class="iconBox-wrapper">
        <iconBox :type="'dailyCheck'"
                 v-for="(item, index) in 5"
                 :storeClass="categories.length"
                 :index="index"
                 :key="index"
                 @click.native="bindNavigator(index)" />
        <iconBox :type="'gradeReport'"
                 :iconData="data1"
                 :hasNew="'news'"
                 @click.native="handleClick(data1.link)" />
      </div>
    </ContentBox>
  </div>
</template>

<script>
import ContentBox from './contentBox'
import iconBox from './iconBox'

import { mapMutations } from 'vuex'

export default {
  props: ['categories'],
  components: {
    ContentBox,
    iconBox
  },
  data () {
    return {
      storeClass: 2,
      data1: {
        icon: './static/images/4s/star_re.png',
        bgIcon: './static/images/4s/starCheck.png',
        text: '星级检查',
        link: 'starCheckW'
      }
    }
  },

  methods: {
    ...mapMutations(['setCategories', 'setLevelId']),
    bindNavigator (index) {
      if (index >= this.categories.length) return
      var item = this.categories[index]
      this.$router.push({ path: '/starCheck', query: { level: index } })
      this.setCategories(item.subCategoryList)
      this.setLevelId(item.id)
    },
    handleClick (linkName) {
      this.$router.push({
        path: '/starCheckW'
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
  margin: 0 auto;
  margin-bottom: 4.4vw;
  .iconBox-wrapper {
    width: 100%;
    box-sizing: border-box;
    // padding-left: 2.4vw;
    // padding-top: 4vw;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
}
</style>