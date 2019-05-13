<template>
  <div class="listItem">
    <div class="img_icon" :style="{backgroundImage:'url(' + img + ')'}"></div>
    <div class="text_box">
      <p class="title">{{ list.goodsName }}</p>
      <span class="type_icon" v-for="(el, v) in getLabel(list.label)" :key=v >
        {{ el }}
      </span>
      <p class="price">¥{{ Math.round(list.price*100)/100 }}</p>
      <div class="like_btn" @click.prevent="changLike">
        <img src="../../../assets/imgs/like.png" alt="收藏" v-if="like">
        <img src="../../../assets/imgs/unlike.png" alt="未收藏" v-else>
        <span>{{ num }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {IndexModel} from '../../../utils/index'
const indexModel = new IndexModel()
export default {
  props: ['list','collectBtn','isChangeLike'],
  data() {
    return {
      like: '',
      num: '',
      account: '',
      img: ''
    }
  },
  mounted() {
    this.judgeImg()
    this.setCollect()
    this.account = this._localAjax().account
  },
  watch: {
    list() {
      this.judgeImg()
      this.setCollect()
    }
  },
  methods: {
    judgeImg() {
      if(this.list.image) {
        this.img = this.list.image
      }else if(this.list.imgUrl) {
        this.img = this.list.imgUrl
      }
    },
    //点击收藏
    changLike() {
      if(this.isChangeLike === 'collect') {
        return
      }
      if(!this.like) {
        this.collect()
      }else {
        this.cancleCollect()
      }
    },
    //字符串转为数组
    getLabel(label) {
      if(label) {
        return this.list.label.split('、')
      }
    },
     //收藏
    collect() {
      let obj = this.getParmas()
      indexModel.galleryCollect(obj).then(res => {
        if(res.status == 1) {
          this.like = !this.like
          this.num += 1
        }
      })
    },
    //取消收藏
    cancleCollect() {
      let obj = this.getParmas()
      indexModel.galleryCancelCollect(obj).then(res => {
        if(res.status == 1) {
          this.like = !this.like
          this.num -= 1
        }
      })
    },
    //获取参数
    getParmas() {
      let obj = {
        id :this.list.id,
        account : this.account,
        type : 3
      }
      return obj
    },
    //设置收藏参数
    setCollect() {
      this.like = this.list.collect
      this.num = this.list.collections
    }
  }
}
</script>

<style lang="scss" scoped>
.listItem {
  width: 94.133vw;
  // height: 26.66vw;
  box-shadow:0px 0.4vw 1.2vw 0px rgba(200,219,239,0.2);
  border-radius: 1.33vw; 
  background: #fff;
  margin: 0 auto;
  margin-top: 2.66vw;
  display: flex;
  align-items: center;
  position: relative;
  .img_icon {
    background-size: 100% 100%;
    width: 26.66vw;
    height: 26.66vw;
    border-radius: 1.33vw;
    // flex: 0.3
  }
  .text_box {
    margin-left: 2.666vw;
    // flex: 0.7;
    .title {
      width: 62vw;
      color: #363636;
      font-size: 3.73vw;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .type_icon {
      border: 1px solid #FF2D55;
      border-radius: 1.333vw;
      padding:0 1.6vw;
      color:#FF2D55;
      // width: 8vw;
      display: inline-block;
      // line-height: 3.6vw;
      font-size: 2.4vw;
      // color: #666;
      text-align: center;
      margin-right: 2vw;

    }
    .price {
      font-size: 4.8vw;
      color: #e93d3d;
    }
    .like_btn {
      position: absolute;
      right: 2vw;
      bottom: 0;
      color: #909090;
      font-size: 3.2vw;
      padding-top: 2vw;
      padding-left: 2vw;
      display: flex;
      flex-direction:row;
      align-items: center;
      img {
        width: 3.46vw;
        height: 3.06vw;
        margin-right:1.866vw;
      }
    }
  }
}
</style>

