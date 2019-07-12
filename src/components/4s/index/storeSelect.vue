<!--  -->
<template>
  <div :class="`storeSelect on`">
    <h3><span>{{shops[0].name}}</span></h3>
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

  }
}
</script>
<style lang='scss' scoped>
.storeSelect {
  // background: #fff;
  position: relative;
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
    text-align: left;
    background: #fff;
    li{
      padding: 0 4.4vw;
      color: #909090;
    }
  }
}
.on{
  height: 10.67vw;
  background: #fff;
}

 
</style>