<template>
  <div class="content">
    <div class="topbar">
      <p>¥{{list.price}}<span>起</span></p>
      <div class="like" @click="collect">
        <img src="../../../assets/imgs/like.png" alt="" v-if="list.like">
        <img src="../../../assets/imgs/unlike.png" alt="" v-else>
      </div>
      <div class="share">
        <router-link :to="{name: 'share', query: {msg: {title: list.title, price: list.price}}}">
          <img src="../../../assets/imgs/share.png" alt="">
        </router-link>
      </div>
    </div>
    <div class="label" >
      <span v-for="(item, index) in list.type" :key="index">{{item.name}}</span>
    </div>
    <div class="title">
      <h1>{{list.title}}</h1>
      <img src="../../../assets/imgs/trigon1.png" alt="">
      <p>{{list.describe}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {
        price: 16800,
        like: true,
        type: [{
          name: '热销'
        },{
          name: '新品'
        }],
        title: '歌迪亚BCG1-018 珍珠物语 床/床架',
        describe: '产品描述产品描述产品描述产品描述产品描述产品描述产品描述'
      }
    }
  },
  methods: {
    collect() {
      this.list.like = ! this.list.like
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  padding: 0 4vw;
  padding-bottom: 4vw;
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 10vw;
    p{
      flex: 0.9;
      font-size: 4.8vw;
      color: #e93d3d;
      span {
        font-size: 3.2vw;
      }
    }
    img {
      width: 4.8vw;
      height: 4.8vw;
    }
  }
  .label {
    display: flex;
    span {
      border: 1px solid #ff2d55;
      border-radius: 1.33vw;
      width: 8vw;
      line-height: 3.2vw;
      font-size: 2.4vw;
      color: #ff2d55;
      text-align: center;
      margin-right: 2vw;
    }
  }
  .title {
    h1 {
      color: #363636;
      font-size: 3.73vw;
      font-weight: normal;
      margin-top: 2vw;
    }
    img {
      width: 3.6vw;
      height: 3.2vw;
      margin-left: 4vw;
    }
    p {
      background: #f1f1f1;
      border-radius: 0.66vw;
      padding: 1.6vw;
      color: #909090;
      margin-top: -2.4vw;
    }
  }
}
</style>
