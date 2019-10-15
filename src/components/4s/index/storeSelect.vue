<!--  -->
<template>
  <div :class="`storeSelect ${storeSelectShow ? 'on' : ''}`">
    <h3>
      <span @click.stop="showStoreList">{{shops[selectIndex]&&shops[selectIndex].name}}</span>
    </h3>
    <ul @click="storeSelectShow = false">
      <li @click.stop="bindSelect(index,item)"
          v-for="(item, index) in shops"
          :key="`shops${index}`">
        <span>{{item.name}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    shops: {
      type: Array,
      default: () => {
        return [{ name: '' }]
      }
    }
  },
  data() {
    return {
      selectIndex: sessionStorage.getItem('selectIndex') || 0,
      storeSelectShow: false
    }
  },
  created() {
    this.$nextTick(() => {
      document.onclick = () => {
        this.storeSelectShow = false
      }
    })
  },
  methods: {
    // async _initData() {
    //   let { code, msg, shops } = await gradeShops()
    //   if (code != 0) {
    //     Toast({
    //       message: msg,
    //       position: 'middle',
    //       duration: 2000
    //     })
    //     return
    //   }
    //   if (shops.length > 0) {
    //     this.shops = shops
    //     this.shopId = shops[0].id
    //     this.setShopId(shops[0].id)
    //     this.soreClass = shops[0].starLevel
    //   }
    // },
    showStoreList() {
      this.storeSelectShow = !this.storeSelectShow
    },
    bindSelect(index, item) {
      this.selectIndex = index
      sessionStorage.setItem('selectIndex', index)
      this.storeSelectShow = false
      this.$emit('onGetStoreId', item, index)
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

  h3 {
    font-size: 14px;
    text-align: center;
    color: #363636;
    line-height: 1.1;
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    span {
      display: inline-block;
      padding-right: 5px;
      max-width: 300px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding-top: 2px;
    }
    &:after {
      content: '';
      display: block;
      background: url(../../../assets/imgs/4s/starCheck/zhankai.png) no-repeat;
      background-size: 3.2vw auto;
      width: 3.2vw;
      height: 7px;
      transition: all 0.8s;
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
      text-align: center;
      &:first-child {
        padding-top: 10px;
      }
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
    }
  }
}
.on {
  display: block;
  height: 10.67vw;
  background: #fff;
  overflow: visible;
  h3 {
    &:after {
      transform: rotate(-180deg);
    }
  }
}
</style>