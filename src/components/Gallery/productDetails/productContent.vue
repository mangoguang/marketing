<template>
  <div class="content">
    <div class="topbar">
      <p>¥{{Math.round(list.price*100)/100}}<span>起</span></p>
      <div class="like" @click="changLike">
        <img src="../../../assets/imgs/like.png" alt="" v-if="like">
        <img src="../../../assets/imgs/unlike.png" alt="" v-else>
      </div>
      <div class="share">
        <router-link :to="{name: 'share', query: {msg: {title: list.goodsName, price: Math.round(list.price*100)/100}}}">
          <img src="../../../assets/imgs/share.png" alt="">
        </router-link>
      </div>
    </div>
    <div class="type">
        <div class="type_icon" v-for="(el, v) in getLabel(list.label)" :key='v'>
          {{ el }}
        </div>
      </div>
    <div class="title">
      <h1>{{list.goodsName}}</h1>
      <img src="../../../assets/imgs/trigon1.png" alt="">
      <p>{{list.remark}}</p>
    </div>
  </div>
</template>

<script>
import {IndexModel} from '../../../utils/index'
const indexModel = new IndexModel()
export default {
  props: ['list'],
  data() {
    return {
      like: '',
      ajaxData: {}
    }
  },
  mounted() {
    this.like = this.list.collect
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  methods: {
    //收藏按钮
    changLike() {
      if(!this.like) {
        this.collect()
      }else {
        this.cancleCollect()
      }
    },
    //字符串转为数组
    getLabel(label) {
      if(label) {
        return this.list.label.split(',')
      }
    },
      //收藏
    collect() {
      let obj = this.getParmas()
      indexModel.galleryCollect(obj).then(res => {
        if(res.status == 1) {
          this.like = !this.like
        }
      })
    },
    //取消收藏
    cancleCollect() {
      let obj = this.getParmas()
      indexModel.galleryCancelCollect(obj).then(res => {
        if(res.status == 1) {
          this.like = !this.like
        }
      })
    },
     //获取参数
    getParmas() {
      let obj = {
        id :this.list.id,
        account : this.ajaxData.account,
        type : 3
      }
      return obj
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
   .type{
      display: flex;
      min-height: 6vw;
      .type_icon {
        font-size: 2.4vw;
        color: #666;
        line-height: 1.4em;
        margin-right: 2vw;
        max-width: 42vw;
        word-wrap:break-word;
        word-break:break-all;
        display: flex;
      }
    }
}
</style>
