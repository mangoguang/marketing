<!--  -->
<template>
  <div class="moduleConfig">
    <ContentBox class="wrapper" :title="'日常检查'">
      <div class="iconBox-wrapper">
        <iconBox/>
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

    }
  }
}
</script>
<style lang='scss' scoped>
.wrapper {
    margin: 0 auto;
    margin: 4.4vw;
  .iconBox-wrapper {
    width: 100%;
    box-sizing: border-box;
    // padding-left: 2.4vw;
    // display: flex;
    // flex-wrap: wrap;
    // align-items: center;
  }
}
 
</style>