<!--  -->
<template>
  <div>
    <ContentBox class="wrapper" :title="'星级认证'">
      <div class="iconBox-wrapper" >  
        <div class="icon-box">
            <iconBox  :type="'gradeReport'"
                      :iconData="data1"
                      @click.native="handleClick(data1.link)"
                      />
        </div>
      </div>
      
    </ContentBox>
  </div>
</template>

<script>
import ContentBox from './contentBox'
import IconBox from './iconBox'
export default {
  components : {
    ContentBox,
    IconBox
  },
  data () {
    return {
      data1: {
        icon: './static/images/4s/atest.png',
        bgIcon: './static/images/4s/starCheck.png',
        text: '星级认证',
        link: 'starAtest'
      }
    };
  },
  methods: {
    handleClick(linkName) {
      this.$router.push({
        name: linkName
      })
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
  }
  .icon-box {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
}

 
</style>