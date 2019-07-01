<!--  -->
<template>
  <div class="dailyCheck">
    <ContentBox class="wrapper" :title="'日常检查'">
      <div class="iconBox-wrapper">
        <iconBox
        :type="'dailyCheck'"
        v-for="(item, index) in 5"
        :storeClass="storeClass"
        :index="index"
        :key="`iconBox${index}`"
        />
        <iconBox  :type="'gradeReport'"
                  :iconData="data1"
                  :hasNew="'news'"
                  />
      </div>
    </ContentBox>
  </div>
</template>

<script>
import ContentBox from './contentBox'
import iconBox from './iconBox'
export default {
  components : {
    ContentBox,
    iconBox
  },
  data () {
    return {
      storeClass: 3,
      data1: {
        icon: './static/images/4s/star_re.png',
        bgIcon: './static/images/4s/starCheck.png',
        text: '星级检查',
        link: 'starCheckW'
      }
    }
  },
  methods: {
    handleClick() {
      console.log(123)
      // this.$router.push({
      //   name: linkName
      // })
    }
  },
  methods: {

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