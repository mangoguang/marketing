<!--  -->
<template>
  <div class="moduleConfig">
    <ContentBox class="wrapper" :title="'模块配置'">
      <div class="iconBox-wrapper">
        <iconBox1 
        :icon="'lock'"
        :title="'权限配置'"
        />
      </div>
    </ContentBox>
  </div>
</template>

<script>
import ContentBox from './contentBox'
import iconBox1 from './iconBox1'
export default {
  components : {
    ContentBox,
    iconBox1
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