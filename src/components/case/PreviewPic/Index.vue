<template>
  <div class="preview">
    <div class="nav">
      <div class="back"
           @click="$router.back()"></div>
      <div class="dot">{{changeIndex+1}}/{{imgList.length}}</div>
      <div class="del"
           @click="sheetVisible=true"></div>
    </div>
    <div class="img-pre">
      <mt-swipe :auto="0"
                :show-indicators="false"
                :defaultIndex="imgIndex"
                @change="bindChange">
        <mt-swipe-item v-for="(item,index) in imgList"
                       :key="index">
          <div class="slider">
            <img :src="item.src"
                 alt="">
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <mt-actionsheet :actions="actions"
                    v-model="sheetVisible">
    </mt-actionsheet>
  </div>
</template>
<script>
export default {
  props: {
    imgIndex: {
      type: Number,
      default: 0
    },
    imgList: {
      type: Array
    }
  },
  data() {
    let _this = this
    return {
      changeIndex: 0,
      sheetVisible: false,
      actions: [
        { name: '要删除这张照片吗？', method: () => {} },
        { name: '删除', method: _this._delete }
      ]
    }
  },
  methods: {
    bindChange(index) {
      this.changeIndex = index
    },
    _delete() {
      let delIndex = this.changeIndex
      this.$emit('onDeleteImg', this.imgList[delIndex].name)
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .mint-actionsheet-listitem {
  color: #909090;
  font-size: 13px;
  &:last-child {
    color: #db6971;
  }
}
/deep/ .mint-actionsheet-button {
  font-size: 16px;
}
.img-pre {
  height: calc(100vh-44px);
  .slider {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  img {
    width: 100%;
    vertical-align: middle;
  }
}
.nav {
  width: 375px;
  height: 44px;
  background: #fff;
  position: relative;
  .back {
    height: 44px;
    width: 44px;
    background: url(~@/assets/imgs/back.png) left center / 10px 18px no-repeat;
    position: absolute;
    top: 0;
    left: 16px;
  }
  .dot {
    color: #363636;
    text-align: center;
    font-size: 19px;
    line-height: 44px;
  }
  .del {
    height: 44px;
    width: 44px;
    background: url(~@/assets/imgs/trash.png) right center / 15px 19px no-repeat;
    position: absolute;
    top: 0;
    right: 16px;
  }
}
</style>