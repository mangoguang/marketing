<!--  -->
<template>
  <div :class="`storeSelect ${storeSelectShow ? 'on' : ''}`">
    <h3><span @click.stop="showStoreList">{{shops[selectIndex].name}}</span></h3>
    <ul @click="storeSelectShow = false">
      <li @click.stop="bindSelect(index,item.id)"
          v-for="(item, index) in shops"
          :key="`shops${index}`"><span>{{item.name}}</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    shops: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      selectIndex: 0,
      storeSelectShow: false
    }
  },
  created () {
    this.$nextTick(() => {
      document.onclick = () => {
        this.storeSelectShow = false
      }
    })
  },
  methods: {
    showStoreList () {
      this.storeSelectShow = !this.storeSelectShow
    },
    bindSelect (index, id) {
      this.selectIndex = index
      this.storeSelectShow = false
      this.$emit('onGetStoreId', id)
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
  span {
    display: inline-block;
    padding-right: 5vw;
    max-width: 86vw;
    height: 10.67vw;
    line-height: 10.67vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
  }
  h3 {
    font-size: 14px;
    text-align: center;
    color: #363636;
    line-height: 3em;
    span {
      background: url(../../../assets/imgs/4s/starCheck/zhankai.png) no-repeat;
      background-size: 3.2vw auto;
      background-position: right 0 top 50%;
    }
  }
  ul {
    position: absolute;
    height: 100vh;
    width: 100%;
    text-align: left;
    z-index: 1000;
    background: rgba(0, 0, 0, 0.2);
    li {
      padding: 0 4.4vw;
      color: #909090;
      background: #fff;
    }
  }
}
.on {
  display: block;
  height: 10.67vw;
  background: #fff;
  overflow: visible;
}
</style>