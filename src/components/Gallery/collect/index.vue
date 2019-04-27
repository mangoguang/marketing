<template>
  <div class="container">
    <div class="list-item"  data-type="0">
      <div
        class="list-box"
        @touchstart.capture="touchStart"
        @touchend.capture="touchEnd"
        @click.prevent="skip"
      >
      <listStyle :list="list" class="list" :isChangeLike='"collect"'/>
      </div>
      <div class="delete">
        <p class="delete-icon" v-show="isDelete" @click="deleteBtn">删除</p>
        <p class="make_sure" v-show='makeSureDelete' @click="sureDelete">确认删除</p>
      </div>
    </div>
  </div>
</template>

<script>
import listStyle from "../productList/listStyle";
import { IndexModel } from "../../../utils/index";
const indexModel = new IndexModel();
export default {
  components: { listStyle },
  props: ['list','index','cancleCollect'],
  data() {
    return {
      startX: 0,
      endX: 0,
      isDelete: true,
      makeSureDelete: false
    };
  },
  methods: {
    //跳转
    skip() {
      if (this.checkSlide()) {
        this.restSlide();
      } else {
        this.toDetails()
      }
    },
     //跳转详情页面
    toDetails() {
      this.$router.push({
        path: "/productDetails",
        query: {
          id: this.list.id
        }
      });
    },
    //滑动开始
    touchStart(e) {
      // 记录初始位置
      this.startX = e.touches[0].clientX;
    },
    //滑动结束
    touchEnd(e) {
      // 当前滑动的父级元素
      let parentElement = e.currentTarget.parentElement;
      // 记录结束位置
      this.endX = e.changedTouches[0].clientX;
      // 左滑
      if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
        this.restSlide();
        parentElement.dataset.type = 1;
      }
      // 右滑
      if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
        this.restSlide();
        parentElement.dataset.type = 0;
      }
      this.startX = 0;
      this.endX = 0;
    },
    //判断当前是否有滑块处于滑动状态
    checkSlide() {
      let listItems = document.querySelectorAll(".list-item");
      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].dataset.type == 1) {
          return true;
        }
      }
      return false;
    },
    //复位滑动状态
    restSlide() {
      let listItems = document.querySelectorAll(".list-item");
      this.isDelete = true
      this.makeSureDelete = false
      // 复位
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].dataset.type = 0;
      }
    },
     //删除收藏
    deleteBtn() {
      this.isDelete = false
      this.makeSureDelete = true
    },
    sureDelete() {
      this.makeSureDelete = false
      this.isDelete = false;
      this.cancleData()
      this.restSlide();
    },
     //删除收藏
    cancleData() {
      let obj = {
        type: 3,
        id: this.list.id,
        account: this._localAjax().account
      };
      indexModel.galleryCancelCollect(obj).then(res => {
        if(res.status === 1) {
          this.cancleCollect(this.index)
        }
      });
      // this.$router.go(0)
    }
  }
};
</script>

<style lang="scss" scoped>
.list-item {
  position: relative;
  height: 28.66vw;
  -webkit-transition: all 0.1s;
  transition: all 0.1s;
}
.list-item[data-type="0"] {
  transform: translate3d(0, 0, 0);
}
.list-item[data-type="1"] {
  transform: translate3d(-1rem, 0, 0);
}
.list-box {
  background: #fff;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 0;
  margin-bottom: 2vw;
}
.list-item .delete {
  width: 13.33vw;
  height: 28.66vw;
  font-size: 17px;
  color: #fff;
  text-align: center;
  position: absolute;
  top: 0;
  right: -20vw;
  display: flex;
  align-items: center;
  .delete-icon {
    text-align: center;
    font-size: 4vw;
    border-radius: 50%;
    color: #fff;
    background: #ff3338;
    width: 13.33vw;
    line-height: 13.33vw;
    box-sizing: border-box;
  }
   .make_sure {
      text-align: center;
      font-size: 4vw;
      border-radius: 2.66vw;
      color: #fff;
      background: #ff3338;
      width: 13.33vw;
      height: 13.33vw;
      padding: 0 2vw;
      line-height: 1em;
      padding-top: 2.6vw;
      box-sizing: border-box;
    }
}
.list {
  width: 100vw!important;
}
</style>
