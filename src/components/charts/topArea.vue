<template>
  <div id="area">
    <div class="topArea" @click="showArea">
      <div
        class="areaName"
        v-if="areaList[areaLine]"
      >{{areaList[areaLine].shopName?areaList[areaLine].shopName:areaList[areaLine]}}</div>
      <div class="icon">
        <img class="downicon" src="../../assets/imgs/clickdown.png" alt />
      </div>
    </div>
    <div class="areaList" v-show="isShow">
      <ul :class="isScroll?'scroll':''">
        <li
          :class="['myli',index==areaLine?'active':''] "
          v-for="(item,index) in areaList"
          :key="index"
          @click="changeArea(item,index)"
        >
          <span><p v-show="isKey">{{item.shopName?item.shopName:item}}</p></span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import mango from "../../js";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      isShow: false,
      areaList: [],
      ajaxData: {},
      url: "/v3/app/getCityByDealerBoss",
      isKey: false,
      isScroll: false
    };
  },
  created() {
    let ajaxData = localStorage.getItem("ajaxData");
    this.ajaxData = JSON.parse(ajaxData);
    if (this.ajaxData.typename == "Store Manager") {
      this.url = "/v3/app/getShopListByUserId";
      // this.left = "-33vw";
    }
  },
  computed: {
    ...mapState({
      areaLine: state => state.topLine.areaLine,
      areaMsg: state => state.topLine.areaMsg
    })
  },
  methods: {
    ...mapMutations(["setAreaLine", "setAreaName"]),
    // 展开区域选项
    showArea() {
      this.isShow = !this.isShow;
      if (this.isShow) {
        setTimeout(() => {
          this.isKey = true;
        }, 300);
      } else {
        this.isKey = false;
      }
    },
    // 获取区域信息
    getAreaList() {
      mango.getAjax(this.url).then(res => {
        // console.log(res);
        let { data, status } = res;
        if (status) {
          this.areaList = data;
          this.isScroll = this.areaList.length>5
          if (this.ajaxData.typename == "Store Manager") {
            if (!this.areaMsg) {
              this.setAreaName(data[0].shopId);
            }
          } else {
            if (!this.areaMsg) {
              this.setAreaName(data[0]);
            }
          }
          this.$emit("getArea", this.areaMsg);
        }
      });
    },
    // 获取区域
    changeArea(val, index) {
      console.log(val);
      // 本地储存
      this.setAreaLine(index);
      // 隐藏选项框
      this.isShow = false;
      // console.log(val);
      if (this.ajaxData.typename == "Store Manager") {
        this.setAreaName(val.shopId);
      } else {
        this.setAreaName(val);
      }
      this.$emit("getArea", this.areaMsg);
      this.isKey = false;
    }
  },
  mounted() {
    this.getAreaList();
  }
};
</script>
<style lang='scss' scoped>
#area {
  .topArea {
    width: 150px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    display: flex;
    
    .areaName {
      display: inline-block;
      text-align: right;
      white-space: nowrap;
      width: 150px;
      height: 30px;
      line-height: 30px;
      padding: 0 6px;
      color: #5792ca;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .icon {
      width: 10px;
      height: 8px;
      .downicon {
        width: 100%;
        height: 100%;
      }
    }
  }
  .areaList {
    width: 285px;
    // height: 210px;
    background: rgba(44, 145, 255, 0.9);
    -webkit-box-shadow: 0px 6px 8px 0px rgba(0, 122, 255, 0.2),
      0px 1px 0px 0px rgba(103, 176, 255, 1);
    box-shadow: 0px 6px 8px 0px rgba(0, 122, 255, 0.2),
      0px 1px 0px 0px rgba(103, 176, 255, 1);
    -moz-box-shadow: 0px 6px 8px 0px rgba(0, 122, 255, 0.2),
      0px 1px 0px 0px rgba(103, 176, 255, 1);
    -webkit-border-radius: 11px;
    -moz-border-radius: 11px;
    border-radius: 11px;
    position: absolute;
    top: 12vw;
    left: -39vw;
    // padding: 5px 0;
    animation: city 0.2s linear 1;
    -webkit-animation: city 0.2s linear 1;
    // animation-iteration-count: 1;
    // -webkit-animation-iteration-count: 1;
    padding-top: 10px;
    z-index: 99;
    ul {
      &.scroll {
        height: 230px;
        overflow-y: scroll;
      }
      .myli {
        text-align: center;
        font-size: 12px;
        color: #a0ceff;
        // height: 35px;
        // line-height: 30px;
        display: flex;
        // padding: 5px 0;
        margin-bottom: 10px;
        justify-content: center;
        align-items: center;
        span {
          // display: inline-block;
          display: flex;
          align-items: center;
          height: 35px;
          // line-height: 35px;
          // padding-top: 9px;
          box-sizing: border-box;
        }
        &.active {
          color: #ffffff;
        }
      }
    }
  }
}
@keyframes city {
  0% {
    width: 0;
    left: 39vw;
    // top: 0;
  }
  100% {
    width: 285px;
    // top: 40px;
    left: -39vw;
  }
}
</style>