<!--  -->
<template>
  <div :class="`storeSelect ${storeSelectShow ? 'on' : ''}`">
    <h3><span @click="showStoreList">{{shops[0].name}}</span></h3>
    <ul>
      <li
      v-for="(item, index) in shops"
      :key="`shops${index}`"
      ><span>{{item.name}}</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      storeSelectShow: false,
      // shops: JSON.parse(localStorage.getItem('shops'))
      shops: [
        {
          "aliasName":"禅城慕思（凯奇/3D/歌蒂娅/0769）",
          "crmId":"1-1IW3WN",
          "id":"1129280494186131457",
          "name":"1佛山市禅城区美居（凯奇/3D/0769/歌蒂娅/兰博基尼）专卖店",
          "parentId":""
        },
        {
          "aliasName":"禅城慕思（凯奇/3D/歌蒂娅/0769）",
          "crmId":"1-1IW3WN",
          "id":"1129280494186131457",
          "name":"2佛山市禅城区美居（凯奇/3D/0769/歌蒂娅/兰博基尼）专卖店",
          "parentId":""
        },
        {
          "aliasName":"禅城慕思（凯奇/3D/歌蒂娅/0769）",
          "crmId":"1-1IW3WN",
          "id":"1129280494186131457",
          "name":"3佛山市禅城区美居",
          "parentId":""
        },
        {
          "aliasName":"禅城慕思（凯奇/3D/歌蒂娅/0769）",
          "crmId":"1-1IW3WN",
          "id":"1129280494186131457",
          "name":"4佛山市禅城区美居",
          "parentId":""
        }
      ]
    }
  },
  created() {
    
  },
  mounted() {

  },
  methods: {
    showStoreList() {
      this.storeSelectShow = !this.storeSelectShow
    }
  }
}
</script>
<style lang='scss' scoped>
.storeSelect {
  // background: #fff;
  position: relative;
  overflow: hidden;
  background: #f8f8f8;
  span{
    display: inline-block;
    padding-right: 5vw;
    max-width: 86vw;
    height: 10.67vw;
    line-height: 10.67vw;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
    vertical-align:top;
  }
  h3{
    font-size: 14px;
    text-align: center;
    color: #363636;
    line-height: 3em;
    span{
      background: url(../../../assets/imgs/4s/starCheck/zhankai.png) no-repeat;
      background-size: 3.2vw auto;
      background-position: right 0 top 50%;
    }
  }
  ul{
    position: absolute;
    height: 100vh;
    text-align: left;
    z-index: 1000;
    background: rgba(0, 0, 0, .2);
    li{
      padding: 0 4.4vw;
      color: #909090;
      background: #fff;
    }
  }
}
.on{
  display: block;
  height: 10.67vw;
  background: #fff;
  overflow: visible;
}

 
</style>