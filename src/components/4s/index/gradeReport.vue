<!--  -->
<template>
  <div>
    <ContentBox class="wrapper" :title="'评分报表'">
      <div class="iconBox-wrapper" >  
        <div class="icon-box">
            <iconBox  :type="'gradeReport'"
                      :iconData="data1"
                      @click.native="handleClick(data1.link)"
                      />
            <iconBox  :type="'gradeReport'"
                      :iconData="data2"
                      @click.native="handleClick(data2.link)"
                      :hasNew="'tips'"
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
        icon: './static/images/4s/starCheck/write.png',
        bgIcon: './static/images/4s/starCheck/btnBg.png',
        text: '检查记录',
        link: 'recordJxs'
      },
      data2: {
        icon: './static/images/4s/star_re.png',
        bgIcon: './static/images/4s/starResult.png',
        text: '评星结果',
        link: 'judgeStar'
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