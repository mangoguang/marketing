<!--  -->
<template>
  <div class="dailyCheck">
    <ContentBox class="wrapper"
                :title="'日常检查'">
      <div class="iconBox-wrapper">
        <!-- <iconBox :type="'dailyCheck'"
                 v-for="(item, index) in 5"
                 :storeClass="categories.length"
                 :index="index"
                 :key="index"
                 @click.native="bindNavigator(index)" /> -->
        <iconBox :type="'gradeReport'"
                 :iconData="data"
                 :hasNew="'tip'"
                 @click.native="handleClick(data.link)" />
      </div>
    </ContentBox>
  </div>
</template>

<script>
import ContentBox from './contentBox'
import iconBox from './iconBox'

export default {
  props: ['shopId', 'shops'],
  components: {
    ContentBox,
    iconBox
  },
  data() {
    return {
      storeClass: 2,
      data: {
        icon: './static/images/4s/star_re.png',
        bgIcon: './static/images/4s/starCheck.png',
        text: '星级检查',
        link: 'starCheckW',
        shops: []
      }
    }
  },
  methods: {
    handleClick(linkName) {
      let positionType = JSON.parse(localStorage.getItem('ajaxData'))
        .positionList.positionType
      let certPositionType = localStorage.getItem('certPositionType')
      if (certPositionType == 'supervisor') {
        //督导
        this.$router.push({
          path: '/leader-check'
        })
        return
      }
      let starLevel = this.shops[sessionStorage.getItem('selectIndex') || 0]
        .starLevel
      this.$router.push({
        path: '/starCheck',
        query: { shopId: this.shopId, starLevel }
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