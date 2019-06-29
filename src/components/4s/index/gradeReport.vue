<!--  -->
<template>
  <div>
    <ContentBox class="wrapper" :title="'评分报表'">
      <div class="iconBox-wrapper" >  
        <div class="icon-box">
           <router-link :to='{
                        name:recordLink.pathname,
                        params: recordLink.params}'>  
            <iconBox   :type="'gradeReport'"/>
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
      recordLink: {
        pathname: 'record',
        params: {
          name: '123'
        }
      }
    };
  },
  methods: {
   
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
// .wrapper {
//     margin: 0 auto;
//     margin-bottom: 4.4vw;
//   .iconBox-wrapper {
//     width: 100%;
//     box-sizing: border-box;
//     padding-left: 2.4vw;
//     padding-top: 4vw;
//     display: flex;
//     flex-wrap: wrap;
//     align-items: center;
//   }
//   .icon-box {
//     margin-right: 8vw;
//     margin-bottom: 4vw;
//   }
// }
 
</style>