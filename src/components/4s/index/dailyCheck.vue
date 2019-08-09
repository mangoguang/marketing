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
  props: ['shopId'],
  components: {
    ContentBox,
    iconBox
  },
  data () {
    return {
      storeClass: 2,
      data: {
        icon: './static/images/4s/star_re.png',
        bgIcon: './static/images/4s/starCheck.png',
        text: '星级检查',
        link: 'starCheckW'
      }
    }
  },

  methods: {
    handleClick (linkName) {
      let positionType = JSON.parse(localStorage.getItem('ajaxData')).positionList.positionType
      if (this.$route.query.dudao) {
        //督导
        this.$router.push({
          path: '/leader-check'
        })
        return
      }
      this.$router.push({ path: '/starCheck', query: { shopId: this.shopId } })

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