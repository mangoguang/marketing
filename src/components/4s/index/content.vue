<!--  -->
<template>
  <div>
    <ContentBox class="wrapper" :title="'日常检查'">
      <div class="iconBox-wrapper">
        <iconBox :contentData='starData' :starImg='true'/>
      </div>
    </ContentBox>
    <ContentBox class="wrapper" :title="'评分报表'">
      <div class="iconBox-wrapper" >  
        <div class="icon-box">
           <router-link :to='{
                        name:recordLink.pathname,
                        params: recordLink.params}'>  
            <iconBox :contentData='contentData'/>
          </router-link>
        </div>
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
      contentData: {
        imgUrl: './static/images/4s/record.png',
        text: '检查记录'
      },
      starData: {
        imgUrl: './static/images/4s/star1.png',
        text: '检查记录'
      },
      recordLink: {
        pathname: 'record',
        params: {
          name: '123'
        }
      }
    };
  },
  methods: {
    test() {
      this.$router.push({path: '/record'})
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
    padding-left: 2.4vw;
    padding-top: 4vw;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }
  .icon-box {
    margin-right: 8vw;
    margin-bottom: 4vw;
  }
}
 
</style>