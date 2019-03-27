<template>
  <div class="delete">
    <div class="slider">
      <div
        class="content"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        :style="deleteSlider"
      >
        <!-- 插槽中放具体项目中需要内容-->
        <slot>
          <listStyle :list="list" @click.native="toDetails"/>
        </slot>
      </div>
      <div class="remove" ref="remove" @click="deleteBtn">
        <p class="delete" v-show="isDelete">删除</p>
        <p class="make_sure" v-show="makeSureDelete">确认删除</p>
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
  props: ["list", 'index', 'cancleCollect'],
  data() {
    return {
      isDelete: true,
      makeSureDelete: false,
      startX: 0, //触摸位置
      endX: 0, //结束位置
      moveX: 0, //滑动时的位置
      disX: 0, //移动距离
      deleteSlider: "", //滑动时的效果,使用v-bind:style="deleteSlider"
      key: true,
      ajaxData: {}
    };
  },
  created() {
    let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData)
  },
  methods: {
    //跳转详情页面
    toDetails() {
      this.key &&
        this.$router.push({
          path: "/productDetails",
          query: {
            id: this.list.id
          }
        });
    },
    //删除收藏
    deleteBtn() {
      if (!this.makeSureDelete) {
        this.isDelete = false;
        this.makeSureDelete = true;
      } else {
        this.deleteSlider = "transform:translateX(0px)";
        this.isDelete = true;
        this.makeSureDelete = false;
        this.cancleData()
      }
    },
    //删除收藏
    cancleData() {
      let obj = {
        type: 3,
        id: this.list.id,
        account: this.ajaxData.account
      };
      indexModel.galleryCancelCollect(obj).then(res => {
        if(res.status === 1) {
          this.cancleCollect(this.index)
        }
      });
    },
    touchStart(ev) {
      ev = ev || event;
      //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
      if (ev.touches.length == 1) {
        // 记录开始位置
        this.startX = ev.touches[0].clientX;
      }
    },
    touchMove(ev) {
      this.key = false;
      ev = ev || event;
      //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
      let wd = this.$refs.remove.offsetWidth;
      if (ev.touches.length == 1) {
        // 滑动时距离浏览器左侧实时距离
        this.moveX = ev.touches[0].clientX;
        //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
        this.disX = this.startX - this.moveX;
        // console.log(this.disX)
        // 如果是向右滑动或者不滑动，不改变滑块的位置
        if (this.disX < 0 || this.disX == 0) {
          this.deleteSlider = "transform:translateX(0px)";
          // 大于0，表示左滑了，此时滑块开始滑动
        } else if (this.disX > 0) {
          //具体滑动距离我取的是 手指偏移距离*5。
          this.deleteSlider = "transform:translateX(-" + this.disX * 6 + "px)";
          // 最大也只能等于删除按钮宽度
          if (this.disX * 5 >= wd) {
            this.deleteSlider = "transform:translateX(-" + wd + "px)";
          }
        }
      }
    },
    touchEnd(ev) {
      ev = ev || event;
      let wd = this.$refs.remove.offsetWidth;
      if (ev.changedTouches.length == 1) {
        let endX = ev.changedTouches[0].clientX;
        this.disX = this.startX - endX;
        //如果距离小于删除按钮一半,强行回到起点
        if (this.disX * 6 < wd / 2) {
          this.deleteSlider = "transform:translateX(0px)";
          this.isDelete = true;
          this.makeSureDelete = false;
          setTimeout(() => {
            this.key = true;
          }, 300);
        } else {
          //大于一半 滑动到最大值
          this.deleteSlider = "transform:translateX(-" + wd + "px)";
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.delete {
  margin-bottom: 2vw;
  .slider {
    width: 100%;
    height: 26.66vw;
    position: relative;
    user-select: none;
    .content {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 90;
      //    设置过渡动画
      transition: 0.2s;
    }
    .remove {
      box-sizing: border-box;
      position: absolute;
      right: 4vw;
      top: 3vw;
      height: 26.66vw;
      display: flex;
      align-items: center;
      padding-left: 5vw;
      .delete {
        text-align: center;
        font-size: 4vw;
        border-radius: 50%;
        color: #fff;
        background: #ff3338;
        width: 13.33vw;
        line-height: 13.33vw;
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
  }
}
</style>
