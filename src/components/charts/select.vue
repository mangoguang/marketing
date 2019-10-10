<template>
  <div>
    <div class="model" v-show="modelShow" @click="myModel"></div>
    <div id="select">
      <div class="left">
        <div class="area" @touchend="changeArea(1)">
          <span class="title">{{areaContent?areaContent:areaName}}</span>
          <img
            src="../../assets/imgs/back.png"
            alt
            class="back"
            :style="{'transform': `rotate(${areaRotate}deg)`}"
          />
        </div>
        <div class="area" @touchend="changeArea(2)">
          <span class="title">{{brandContent?brandContent:brand}}</span>
          <img
            src="../../assets/imgs/back.png"
            alt
            class="back"
            :style="{'transform': `rotate(${brandRotate}deg)`}"
          />
        </div>
      </div>
      <div class="right" @touchend="changeArea(3)">
        <div class="area">
          <span class="title">{{dateContent?dateContent:'今日'}}</span>
          <img
            src="../../assets/imgs/back.png"
            alt
            class="back"
            :style="{'transform': `rotate(${dateRotate}deg)`}"
          />
        </div>
      </div>
    </div>
    <div class="selecList" v-show="listShow" :style="{top:`${top}`}">
      <ul :class="[ulScroll?'active':'']" :style="{display:`${ulFlex}`}">
        <li
          v-for="(value,index) in selList"
          :key="index"
          @click="getChange(value,index)"
          v-if="value.name == ''?false:true"
        >
          <span
            :class="[{'active':index==listIndex}]"
            :style="{width:`${liWidth}`,border:`${liBorder}`,flexDirection:`${liFlex}`,textAlign:`${liTextAlign}`}"
          >{{value.name.includes('-')?value.name.split('-')[1]:value.name}}</span>
        </li>
      </ul>
      <div class="customize" v-show="timeShow">
        <div class="text">
          <span class="left">自定义</span>
          <!-- <span class="right">时间段筛选不能跨年</span> -->
        </div>
        <div class="cusTime">
          <div class="left">
            <div class="startTime" @click="openDatePick(0)">{{this.startTimeSelect | timeMat}}</div>
            <span style="font-size:14px;padding:0 7px;color:#363636;">-</span>
            <div class="endTime" @click="openDatePick(1)">{{this.endTimeSelect | timeMat}}</div>
          </div>
          <div class="right">
            <button @click="getCusTime">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapState, mapMutations } from "vuex";
import mango from "../../js";
import Bus from "../../utils/Bus";
import { baseUrl, Request } from "../../Request/myRequest";
import axios from "axios";
export default {
  filters: {
    timeMat(value) {
      if (!value) {
        value = moment(new Date()).format("YYYY-MM-DD");
      }
      var str = "";
      var arr = value.split("-");
      arr.forEach(item => {
        str += item;
      });

      return str;
    }
  },
  data() {
    return {
      top: "",
      ulFlex: null,
      liFlex: null,
      liBorder: "1px solid #e1e1e1",
      liWidth: null,
      liTextAlign: "center",
      ulScroll: false,
      areaRotate: -90, //箭头朝向
      areaShow: true, //不显示选项框
      brandRotate: -90,
      brandShow: true,
      dateRotate: -90,
      dateShow: true,
      selList: [], //选项列表
      listShow: false, //不显示选项框
      listIndex: 0, //记录选项
      selectIndex: 1, //记录当前选择的内容
      timeShow: false, //自定义选择
      startDate: moment(new Date()).format("YYYY-MM-DD"), //开始时间
      endDate: moment(new Date()).format("YYYY-MM-DD"), //结束时间
      ajaxData: {}, //用户信息
      areaMsg: "", //本地城市列表
      cityList: [], //城市列表
      brandList: [], //品牌列表,
      areaName: "",//区域名
      brand: "", //品牌选择
      modelShow: false//是否显示遮罩层
    };
  },
  computed: {
    ...mapState({
      areaIndex: state => state.chartSelect.areaIndex, //区域下标
      areaContent: state => state.chartSelect.areaContent, //区域文本
      brandIndex: state => state.chartSelect.brandIndex, //品牌下标
      brandContent: state => state.chartSelect.brandContent, //品牌文本
      dateIndex: state => state.chartSelect.dateIndex, //时间下标
      dateContent: state => state.chartSelect.dateContent, //时间文本
      startTimeSelect: state => state.chartSelect.startTimeSelect, //开始时间
      endTimeSelect: state => state.chartSelect.endTimeSelect, //结束时间
    })
  },
  methods: {
    ...mapMutations([
      "setArea",
      "setBrand",
      "setDate",
      "setStartTime",
      "setEndTime",
    ]),
    // 点击遮罩层
    myModel() {
      // console.log(1);
      this.modelShow = false
      this.listShow = false
      this.areaRotate= -90 //箭头朝向
      this.areaShow= true //不显示选项框
      this.brandRotate= -90
      this.brandShow= true
      this.dateRotate= -90
      this.dateShow= true
    },
    // 打开时间选择框
    openDatePick(index) {
      Bus.$emit("myDate", index);
      // this.modelShow = false;
    },
    // 选择框内容显示功能
    changeArea(index) {
      this.liFlex = null;
      this.liTextAlign = "center";
      this.liBorder = "1px solid #e1e1e1";
      // this.ulFlex = 'flex'
      this.modelShow = false;
      if (!this.listShow) {
        // 显示下拉框
        this.listShow = true;
      }
      // 隐藏自定义时间选择
      this.timeShow = false;
      // 清空选项列表
      this.selList = [];
      switch (index) {
        case 1: //区域选择
          // 默认选项下标
          this.liBorder = "none";
          this.liFlex = "column";
          this.liTextAlign = "left";
          this.ulFlex = "";
          this.listIndex = this.areaIndex;
          // 记录选择的模块
          this.selectIndex = index;
          // 显示或隐藏区域模块
          this.areaShow = !this.areaShow;
          this.listShow = this.areaShow == false ? true : false;
          // console.log(this.listShow,this.areaShow);

          if (this.areaShow) {
            // 隐藏选项框
            this.areaRotate = -90;
            // this.modelShow =false
          } else {
            // 显示选项框
            this.areaRotate = 90;
            this.modelShow = true;
            //隐藏其他选项
            this.brandShow = true;
            this.brandRotate = -90;
            this.dateShow = true;
            this.dateRotate = -90;
            // 构造城市列表选项
            this.liWidth = "98%";
            this.ulScroll = this.cityList.length >= 5;
            if (this.ajaxData.typename == "Store Manager") {
              this.cityList.forEach((value, index) => {
                this.selList.push({
                  name: value.shopName,
                  index: index,
                  id: value.shopId
                });
              });
            } else {
              this.cityList.forEach((value, index) => {
                this.selList.push({
                  name: value,
                  index: index
                });
              });
            }
          }
          break;

        case 2: //品牌选择
          this.ulFlex = "flex";
          this.liWidth = "28vw";
          // 默认选项下标
          this.listIndex = this.brandIndex;
          // 记录选择的模块
          this.selectIndex = index;
          // 显示或隐藏品牌模块
          this.brandShow = !this.brandShow;
          // this.listShow = !this.listShow
          this.listShow = this.brandShow == false ? true : false;
          if (this.brandShow) {
            // 隐藏选项框
            this.brandRotate = -90;
            // this.modelShow =false
          } else {
            this.brandRotate = 90;
            this.modelShow = true;
            //隐藏其他选项
            this.areaShow = true;
            this.areaRotate = -90;
            this.dateShow = true;
            this.dateRotate = -90;
            this.brandList.forEach((item, index) => {
              // if(item.brand.includes('-')) {
              //   item.brand = item.brand.split('-')[1]
              // }
              this.selList.push({
                name: item.brand,
                index: index
              });
            });
          }
          break;
        case 3: //时间模块
          this.ulFlex = "flex";
          this.liWidth = "28vw";
          // 显示自定义时间
          this.timeShow = true;
          // 默认选项下标
          this.listIndex = this.dateIndex;
          // 记录选择的模块
          this.selectIndex = index;
          // 显示或隐藏时间模块
          this.dateShow = !this.dateShow;
          // this.listShow = !this.listShow
          this.listShow = this.dateShow == false ? true : false;
          if (this.dateShow) {
            // 隐藏选项框
            this.dateRotate = -90;
            // this.modelShow =false
          } else {
            this.dateRotate = 90;
            this.modelShow = true;
            //隐藏其他选项
            this.areaShow = true;
            this.areaRotate = -90;
            this.brandShow = true;
            this.brandRotate = -90;
            this.selList = [
              { name: "今日", index: 0 },
              { name: "本周", index: 1 },
              { name: "本月", index: 2 },
              { name: "近三月", index: 3 },
              { name: "今年", index: 4 },
              { name: "", index: 5 }
            ];
          }
          break;
      }
      // this.listShow = false
    },
    // 选择数据信息
    getChange(value, index) {
      switch (this.selectIndex) {
        case 1: //选择区域
          var val = value;
          var obj = {
            value: {
              name: val.name,
              index: val.index
            }
          };

          this.setArea({ value, index });
          //存储到本地
          // localStorage.setItem(
          //   "cityMsg",
          //   `{
          //   "cityName": "${value.name}",
          //   "cityLevel": "${value.level}"
          // }`
          // );
          // this.cityMsg = {
          //   cityName: value.name,
          //   cityLevel: value.level
          // };
          if (this.ajaxData.typename == "Store Manager") {
            this.areaMsg = value.id;
          } else {
            this.areaMsg = value.name;
          }
          this.listIndex = this.areaIndex;
          this.areaRotate = -90;
          this.areaShow = true;
          break;
        case 2: //选择品牌
          var val = value;
          this.brand = val.name;
          // 存储到本地
          localStorage.setItem("brand", val.name);
          if (value.name.includes("-")) {
            value.name = value.name.split("-")[1];
          }
          this.setBrand({ value, index });
          this.listIndex = this.brandIndex;
          this.brandRotate = -90;
          this.brandShow = true;

          break;
        case 3: //选择时间
          var date = new Date();
          var week = date.getDay(); //当前周的天数
          var month = date.getDate(); //当前月的天数
          var curmon = date.getMonth() + 1; //当前月
          var year = date.getFullYear(); //当前年
          // 选取的时间间隔
          switch (index) {
            case 0:
              this.startDate = new Date();
              this.endDate = new Date();
              break;
            case 1:
              if (week && week == 0) {
                week = 7;
                this.startDate =
                  +new Date().getTime() - (week - 1) * 86400 * 1000;
                this.endDate = new Date();
              }
              this.startDate =
                +new Date().getTime() - (week - 1) * 86400 * 1000;
              var last = new Date();
              this.endDate = last.setDate(last.getDate() + (7 - week));
              break;
            case 2:
              this.startDate =
                +new Date().getTime() - (month - 1) * 86400 * 1000;
              var last = moment().endOf("month");
              this.endDate = last._d;
              break;
            case 3:
              if (curmon >= 3) {
                this.startDate = `${year}-0${curmon - 2}-01`;
                var last = moment().endOf("month");
                this.endDate = last._d;
              } else if (curmon == 2) {
                this.startDate = `${year - 1}-12-01`;
                var last = moment().endOf("month");
                this.endDate = last._d;
              } else {
                this.startDate = `${year - 1}-11-01`;
                var last = moment().endOf("month");
                this.endDate = last._d;
              }
              break;
            case 4:
              this.startDate = `${year}-01-01`;
              this.endDate = `${year}-12-31`;
              break;
          }
          this.startDate = moment(this.startDate).format("YYYY-MM-DD");
          this.endDate = moment(this.endDate).format("YYYY-MM-DD");
          this.setStartTime(this.startDate);
          this.setEndTime(this.endDate);
          this.setDate({ value, index });
          this.listIndex = this.dateIndex;
          this.dateRotate = -90;
          this.dateShow = true;
          break;
      }
      //隐藏选择框
      this.listShow = false;
      // 隐藏遮盖层
      this.modelShow = false;
      // 传到父组件数据结构数据结构
      var obj = {
        brand: this.brand,
        startDate: this.startDate,
        endDate: this.endDate,
        areaMsg: this.areaMsg
      };
      // console.log(obj);

      this.$emit("getdata", obj);
    },
    // 确定自定义时间
    getCusTime() {
      if (this.startTimeSelect) {
        this.startDate = this.startTimeSelect;
        // var startYear = this.startTimeSelect.substr(0, 4);
      }
      if (this.endTimeSelect) {
        this.endDate = this.endTimeSelect;
        // var endYear = this.endTimeSelect.substr(0, 4);
      }
      // 判断是否跨年筛选
      // if (startYear != endYear) {
      //   return alert("时间段筛选不能跨年");
      // }
      this.modelShow = false;
      //确定时间
      // var endTime = this.endDate.substr(0, 7);
      // localStorage.setItem("endTime", endTime);
      // 传到父组件数据结构
      var obj = {
        brand: this.brand,
        startDate: this.startDate,
        endDate: this.endDate,
        areaMsg: this.areaMsg
      };
      this.$emit("getdata", obj);
      //隐藏选择框
      this.listShow = false;
      this.dateRotate = -90;
      this.dateShow = true;
      this.setStartTime(this.startDate);
      this.setEndTime(this.endDate);
      var startDate = this.startDate.replace(/\-/g, "");
      var endDate = this.endDate.replace(/\-/g, "");
      var obj = {
        value: { name: `${startDate}-${endDate}`, index: 5 },
        index: 5
      };
      this.setDate(obj);
      this.listIndex = this.dateIndex;
    },

    // 获取门店区域列表
    async getList() {
      var url = "/v3/app/getCityByDealerBoss";
      if (this.ajaxData.typename == "Store Manager") {
        //店长账号
        url = "/v3/app/getShopListByUserId";
        let res = await mango.getAjax(url);
        let { status, data } = res;
        if (status) {
          this.areaName = data[0].shopName;
          this.areaMsg = {};
          this.areaMsg = data[0].shopId;
          //   this.areaName = data[0];
          //   this.areaMsg = data[0];
          this.cityList = data;
          // localStorage.setItem("areaMsg", this.areaMsg);
        }
      } else {
        //经销商账号
        let res = await mango.getAjax(url);
        // console.log(res);
        let { status, data } = res;
        if (status) {
          this.areaName = data[0];
          this.areaMsg = data[0];
          this.cityList = data;
          // localStorage.setItem("areaMsg", this.areaMsg);
        }
      }
      var obj = {
        brand: this.brand,
        startDate: this.startDate,
        endDate: this.endDate,
        areaMsg: this.areaMsg
      };
      this.$emit("getdata", obj);
    },
    // 获取所用品牌
    async getBrand() {
      var url = baseUrl;
      // var url = 'https://qiang.derucci.com'
      // let res = await axios.get( url+"/api/good/brand/list");
      // console.log(res);
      let res = await Request.prototype.getData({
        url: "/api/good/brand/list"
      });
      let { status, data } = res;
      console.log(data);
      if (status) {
        this.brandList = data;
        this.brand = data[0].brand;
        if (!this.brandContent) {
          localStorage.setItem("brand", "");
        }
        if (localStorage.getItem("brand")) {
          this.brand = localStorage.getItem("brand");
        }
        var obj = {
          brand: this.brand,
          startDate: this.startDate,
          endDate: this.endDate,
          areaMsg: this.areaMsg
        };
        this.$emit("getdata", this.brand);
      }
    },
    // 判断是否是iphonex
    isIPhoneX() {
      let phone = this.phoneSize();
      if (phone === "iphonex") {
        this.top = "33.1vw";
      } else if (phone === "iphone") {
        this.top = "27.2vw";
      } else {
        this.top = "27.2vw";
      }
    }
  },
  created() {
    // 获取本地存储信息
    // let cityMsg = localStorage.getItem("cityMsg");
    let ajaxData = localStorage.getItem("ajaxData");
    // this.cityMsg = cityMsg ? JSON.parse(cityMsg) : {};
    this.ajaxData = JSON.parse(ajaxData);
    // if (this.ajaxData.typename == "Store Manager") {
    //   this.width = 120;
    // }
    if (this.startTimeSelect) {
      this.startDate = this.startTimeSelect;
    }
    if (this.endTimeSelect) {
      this.endDate = this.endTimeSelect;
    }
    this.isIPhoneX();
    // 获取所有品牌
    this.getBrand();
    this.getList();
  },
  watch: {
    startTimeSelect() {
      this.startDate = this.startTimeSelect;
    },
    endTimeSelect() {
      // console.log(2);
      this.endDate = this.endTimeSelect;
    }
  }
};
</script>
<style lang="scss" scoped>
.model {
  width: 100vw;
  height: 100vh;
  background: #000;
  opacity: 0.5;
  position: absolute;
  z-index: 10;
}
#select {
  padding-top: 16.466vw;
  position: fixed;
  width: 100vw;
  height: 40px;
  border-bottom: 1px solid #e1e1e1;
  background: rgba(255, 255, 255, 1);
  z-index: 33;
  display: flex;
  justify-content: space-between;
  .left {
    display: flex;

    height: 100%;
    .area {
      width: 95px;
      height: 100%;
      display: flex;
      align-items: center;
      .title {
        color: #363636;
        font-size: 12px;
        padding: 0 10px 0 17px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .back {
        width: 5px;
        height: 10px;
      }
      &:nth-child(1) {
        margin-right: 15px;
      }
    }
  }
  .right {
    // width:80px;
    height: 100%;
    padding-right: 16px;
    // margin-left: 80px;
    .area {
      // float: right;
      // width: 120px;
      height: 100%;
      display: flex;
      align-items: center;
      .title {
        color: #363636;
        font-size: 12px;
        padding: 0 10px 0 5px;
      }
      .back {
        width: 5px;
        height: 10px;
      }
    }
  }
}
.selecList {
  // height: 40px;
  display: flex;
  flex-direction: column;
  // padding-top: 163px;
  background: #fff;
  -webkit-box-shadow: 0px 4px 4px 0px rgba(204, 204, 204, 0.2);
  -moz-box-shadow: 0px 4px 4px 0px rgba(204, 204, 204, 0.2);
  // opacity: 0.9;
  position: fixed;
  left: 0;
  top: 103px;
  z-index: 33;
  border-top: 1px solid #E1E1E1;
  ul {
    &.active {
      height: 210px;
      overflow-y: scroll;
    }
    padding-bottom: 10px;
    width: 100vw;
    // height: 210px;
    overflow-y: scroll;
    // display: flex;
    flex-wrap: wrap;
    align-items: center;
    // justify-content: center;
    padding-left: 4px;

    li {
      margin-top: 5px;
      // width: 20%;
      // height: 30px;
      display: flex;
      justify-content: center;
      margin: 10px 8px 0;
      span {
        display: inline-block;
        width: 100px;
        // padding: 0 20px;
        height: 100%;
        text-align: left;
        // line-height: 30px;
        padding: 5px 0;
        // white-space: nowrap;
        border: 1px solid #e1e1e1;
        color: #363636;
        border-radius: 2px;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        font-size: 12px;
      }
      span.active {
        background: #007aff;
        color: #ffffff;
        border-radius: 4px;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
      }
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
  .customize {
    // height: 61px;
    margin-bottom: 10px;
    width: 100%;
    .text {
      display: flex;
      justify-content: space-between;
      padding: 0 14px 0 10px;
      margin-bottom: 10px;
      .left {
        display: inline-block;
        // width: 34px;
        height: 14px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 14px;
      }
      .right {
        display: inline-block;
        // width: 213px;
        height: 14px;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #909090;
        line-height: 14px;
      }
    }
    .cusTime {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 14px 0 10px;
      .left {
        display: flex;
        .startTime,
        .endTime {
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          // background: #cccccc;
          border: 1px solid #e1e1e1;
          color: #363636;
          border-radius: 2px;
          -webkit-border-radius: 2px;
          -moz-border-radius: 2px;
          font-size: 12px;
        }
      }
      .right {
        width: 60px;
        height: 30px;
        line-height: 30px;
        background: rgba(239, 239, 244, 1);
        border: 1px solid rgba(214, 215, 220, 1);
        border-radius: 2px;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        text-align: center;
        button {
          width: 100%;
          height: 100%;
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #363636;
        }
      }
    }
  }
}
</style>