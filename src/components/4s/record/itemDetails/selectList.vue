<!--  -->
<template>
  <div class="selectList">
    <div class="list_show" @click="handleNavSelect">
      <span class="text">{{ activeItem.text }}</span>
      <span class="icon" :class="showStatus?'rotate':''">
        <img src="../../../../assets/imgs/4s/down.png" alt="">
      </span>
    </div>
    <ul class="list_content" v-show="showStatus">
      <li class="item"  
          :class="activeIndex === index? 'active' : ''"
          v-for="(item,index) in list" :key='index + item'
          @click="handleItemSelect(index)">
        <span class="item-left">{{item.text}}</span>
        <span class="item-right">{{item.score}}分</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      showStatus: false,
      activeIndex: 0,
      activeItem: {}
    };
  },
  created() {
    this.initActiveItem()
  },
  methods: {
    initActiveItem() {
      this.activeItem = this.list && this.list[0]
    },
    handleNavSelect() {
      this.showStatus = !this.showStatus
    },
    handleItemSelect(index) {
      this.activeIndex = index
      this.activeItem = this.list[index]
      this.showStatus = !this.showStatus
    }
  }
}
</script>
<style lang='scss' scoped>
.selectList {
  width: 71.13vw;
  box-sizing: border-box;
  margin: 0 auto;
  text-align: center;
  position: relative;
  .list_show {
    width: 100%;
    height: 13.33vw;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    margin-top: 7.06vw;
    ::after {
      content: '';
      position: absolute;
      top:0;
      left:0;
      box-sizing:border-box;
      border:1px solid #e1e1e1;
      width:200%;
      height:200%;
      transform-origin:0 0 ;
      transform:scale(0.5);
      border-radius: 50px;
    }
    .text {
      color: #090909;
      font-size: 4vw;
      font-weight: 500;
      flex: 0.8;
      padding-left: 12vw;
      box-sizing: border-box;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 70%;
    }
    .icon {
      flex:0.2;
      img {
        width: 3vw;
        height: 3vw;
        transform: rotate(-90deg);
      }
    }
    .rotate {
      img {
       transform: rotate(90deg)
      }
    }
  }
  .list_content {
    width: 71.13vw;
    position: absolute;
    margin-top: 1vw;
    box-sizing: border-box;
    background: rgba(237,237,237,0.9);
    padding:  2vw 0;
    top: 14vw;
    left: 0;
    border-radius: 1.33vw;
    .item {
      display: flex;
      justify-content: space-between;
      padding: 0 7.6vw;
      box-sizing: border-box;
      line-height: 10.4vw;
      border-bottom: 1px solid #fff;
      &:last-child {
        border-bottom: none;
      }
      .item-left {
        color: #000;
        font-size: 4vw;
      }
      .item-right {
        color: #000;
        font-size: 3.46vw;
      }
    }
    .active {
      background: rgba(243,248,255,0.8);
      span {
        color:#007aff !important;
      }
    }
  }
 
}


</style>