<!--  -->
<template>
  <div class="dailyCheck">
    <ContentBox class="wrapper" :title="'日常检查'">
      <div class="iconBox-wrapper">
        <iconBox
        v-for="(item, index) in 5"
        :storeClass="storeClass"
        :index="index"
        :key="`iconBox${index}`"
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
      storeClass: 3
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