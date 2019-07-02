<!--  -->
<template>
  <div class="judgeStar" :style="{'margin-top':`${top}vw`}">
    <div class="header" :style="{'height':`${headerHeight}vw`}">
      <judge-header />
    </div>
    <ul class="content" :style="{'margin-top':`${top}vw,height: ${height}`}">
      <egg-list-item  v-for="(item,index) in list" :key='item + index'
                      :state="item.state"
                      :status='item.status'
                      :star="item.star"
                      @click.native="handleDetailsClick(index,item.star)"/>
    </ul>
    <div class="eggNodeCard" v-show="showStatus"> 
      <egg-node-card  @getClick='getClick' :star="star"/>
    </div>
  </div>
</template>

<script>
import judgeHeader from '../../../components/4s/judgeStar/header'
import eggListItem from '../../../components/4s/judgeStar/listItem'
import eggNodeCard from '../../../components/4s/judgeStar/node_card'

export default {
  components: {
    judgeHeader,
    eggListItem,
    eggNodeCard
  },
  data () {
    return {
      top: '',
      height: '',
      headerHeight: '',
      list: [
        {
          state: '区域未通过',
          status: 0,
          star: 2
        },
        {
          state: '区域未验收',
          status:0,
          star: 3
        },
        {
          state: '已认证',
          status: 1,
          star: 4
        }
      ],
      showStatus: false,
      star: ''
    };
  },
   mounted(){
      this.isIPhoneX()
    },
    methods:{
      handleDetailsClick(index,star) {
        this.showStatus = !this.showStatus
        this.star = star
      },
      getClick(val) {
        this.showStatus = !this.showStatus
      },
      isIPhoneX() {
        let phone = this.phoneSize();
        if (phone === "iphonex") {
          this.top = "-5.86";
          this.height = `calc(100vh - 29.5vw)`
          this.headerHeight = 29.5
        }
      }
    }
}
</script>
<style lang='scss' scoped>
.judgeStar {
  background: #f5f5f5;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  .header {
    width: 100vw;
    height: 35.33vw;
  }
  .content {
    width: 100vw;
    height: calc(100vh - 35.33vw);
    overflow: scroll;
  }
  .eggNodeCard {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba($color: #000000, $alpha: 0.3);
    z-index: 999;
  }
}
</style>