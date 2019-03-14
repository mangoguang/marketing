<template>
  <div class="moreDetails">
    <div class="icon_more" @click="changeShow">
      <img src="../../../assets/imgs/more.png" alt="">
    </div>
    <div class="more_content" v-show="isShow">
      <div class="trigon"></div>
      <ul >
        <li v-for="(item, index) in list" :key="index">
          <router-link :to="{name: item.src}">
            {{item.name}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      list:[{
        name: '图库首页',
        src: 'index'
      },{
        name: '我的收藏',
        src: '/collectList'
      },{
        name: '扫一扫',
        src: '/collectList'
      }]
    }
  },
  methods: {
    changeShow(){
      this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="scss" scoped>
.moreDetails {
  .icon_more {
    padding: 4vw;
    margin-top: -4vw;
    margin-right: -4vw;
    img {
      width: 4.26vw;
      height: 1.06vw;
    }
  }
  .trigon {
    background: url(../../../assets/imgs/trigon.png) no-repeat center;
    background-size: contain;
    width: 2vw;
    height: 1.06vw;
    position: absolute;
    top: 4.98vw;
    right: 1vw;
  }
  ul {
    position: absolute;
    width: 21.33vw;
    right: 0;
    top: 6vw;
    background: rgba(54,54,54,1);
    box-shadow: 0px .26vw .8vw 0px rgba(67,66,66,0.2);
    opacity: 0.96;
    border-radius: 0.53vw;
    li {
      color: #909090;
      font-size: 3.73vw;
      line-height: 8.13vw;
      text-align: center;
      border-bottom: 1px solid #2d2d2d;
      box-shadow:0px 1px 0px 0px rgba(67,66,66,1);
    }
  }
}
a{
  color: #909090;
}
</style>

