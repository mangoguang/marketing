<template>
  <div class="top">
    <v-touch v-on:swiperight="swiperright">
      <div class="topSale">
        <mybanner :title="title" />
        <img :src="bgUrlL" class="bgImage" />
        <div class="topTitle">
          <img class="fly" src="../../../assets/imgs/topleft.png" alt />
          <span style="padding:0 4px">{{topTitle}}</span>
          <img class="fly" src="../../../assets/imgs/topright.png" alt />
        </div>
        <div class="main">
          <div class="top">
            <div class="time">
              <span @click="changeTime">
                时间：
                <span class="timeName">{{timeContent}}</span>
              </span>
              <img class="downicon" src="../../../assets/imgs/clickdown.png" alt />
              <div class="date" v-show="showTime">
                <ul>
                  <li
                    :class="['dateList',{'active':index==dateIndex}]"
                    v-for="(date,index) in dateContent"
                    :key="index"
                    @click="getDate(index)"
                  >
                    <span>{{date}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="unit">
              <span class="unitCon">单位：万元</span>
            </div>
          </div>
          <topList :list="list" />
          <div class="space" v-show="list.length==0">
            <span>暂无数据</span>
          </div>
        </div>
      </div>
    </v-touch>
  </div>
</template>

<script>
// let moment = require("moment");
import moment from 'moment'
import mybanner from "../../../components/banner";
import topList from "../../../components/charts/topList";
import Vuex, { mapState, mapMutations, mapGetters } from "vuex";
import mango from "../../../js";
export default {
  components: {
    mybanner,
    topList
  },
  data() {
    return {
      title: "人物Top榜",
      bgUrlL: "./static/images/topbg.png",
      topTitle: "员工销售Top10",
      timeContent: "今日",
      showTime: false,
      dateContent: ["今日", "本周", "本月", "近三月", "今年"],
      dateIndex: 0,
      startDate: new Date(),
      endDate: new Date(),
      ajaxData: {},
      cityMsg: {},
      list: [],
      url: "/v1/app/top/employee/sales"
    };
  },
  created() {
    // 获取本地存储信息
    // let [ajaxData, cityMsg] = [
    //   localStorage.getItem("ajaxData"),
    //   localStorage.getItem("cityMsg")
    // ];
    // this.cityMsg = cityMsg ? JSON.parse(cityMsg) : {};
    // let ajaxData = localStorage.getItem('ajaxData')
    // this.ajaxData = JSON.parse(ajaxData);
    // let shops = localStorage.getItem('shops')
    // console.log('本地存储的shops:', JSON.parse(shops))
  },
  computed: {
    // ...mapState({
    // citySelect: state => state.select.citySelect,
    // startTimeSelect: state => state.select.startTimeSelect,
    // endTimeSelect: state => state.select.endTimeSelect
    // })
  },
  methods: {
    // 右侧滑动
    swiperright() {
      this.$router.push({'path':'/ReportForms'})
    },
    // vuex数据
    // ...mapMutations(["setStartTimeSelect", "setEndTimeSelect"]),
    // 打开时间选择面板
    changeTime() {
      this.showTime = !this.showTime;
    },
    // 选择时间
    getDate(index) {
      index = +index;
      this.dateIndex = index;
      this.showTime = false;
      this.timeContent = this.dateContent[index];
      // 记录时间选择到本地
      localStorage.setItem("dateLine", index);
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
            this.startDate = +new Date().getTime() - (week - 1) * 86400 * 1000;
            this.endDate = new Date();
          }
          this.startDate = +new Date().getTime() - (week - 1) * 86400 * 1000;
          var last = new Date();
          this.endDate = last.setDate(last.getDate() + (7 - week));
          break;
        case 2:
          this.startDate = +new Date().getTime() - (month - 1) * 86400 * 1000;
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
      // this.setStartTimeSelect(this.startDate);
      // this.setEndTimeSelect(this.endDate);
      this.getTopList(this.startDate, this.endDate);
    },
    // 获取top榜数据
    async getTopList(startDate, endDate) {
      var parmas = {
        startDate,
        endDate
      };
      let res = await mango.getAjax(this.url, parmas);
      let { status, data } = res;
      if (status == 1) {
        this.list = data;
      }
    }
  },
  mounted() {
    var type = this.$route.query.type;
    if (type == "product") {
      this.title = "产品Top榜";
      this.bgUrlL = "./static/images/productbg.png";
      this.topTitle = "产品销售Top10";
      this.url = "/v1/app/top/product/sales";
    }
    var dateLine = localStorage.getItem("dateLine");
    if (dateLine) {
      this.getDate(dateLine);
    } else {
      this.getTopList(this.startDate, this.endDate);
    }
  }
};
</script>

<style lang="scss" scoped>
.top {
  height: 100%;
  background-color: #007aff;
  .topSale {
    width: 375px;
    height: 300px;
    position: relative;
    .bgImage {
      width: 100vw;
      height: 100%;
    }
    .topTitle {
      position: absolute;
      width: 100%;
      height: 15px;
      line-height: 15px;
      left: 0;
      bottom: 4px;
      font-size: 14px;
      color: #c1dfff;
      display: flex;
      justify-content: center;
      .fly {
        width: 11px;
        height: 7px;
        padding-top: 3px;
      }
    }
  }
  .main {
    width: 100vw;
    // height: 100%;
    background-color: #007aff;
    padding-bottom: 15px;
    margin-top: -7px;
    .top {
      // width: 100vw;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .time {
        width: 105px;
        height: 22px;
        background-color: #2c91ff;
        color: #c1dfff;
        margin-left: 9px;
        border-radius: 11px;
        font-size: 12px;
        text-align: center;
        position: relative;
        .timeName {
          display: inline-block;
          width: 36px;
          white-space: nowrap;
          text-align: center;
        }
        .date {
          margin-top: 4px;
          width: 216px;
          height: 87px;
          background-color: rgba(44, 145, 255, 0.9);
          border-radius: 8px;
          position: absolute;
          ul {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            height: 100%;
            padding: 9px;
            box-sizing: border-box;
            .dateList {
              width: 60px;
              height: 30px;
              line-height: 30px;
              background: #a0ceff;
              border-radius: 8px;
              color: #2c91ff;
              margin-bottom: 9px;
              margin-right: 9px;
              &:nth-child(3n) {
                margin-right: 0;
              }
            }
            .active {
              background: #007aff;
              color: #fff;
            }
          }
        }
        .downicon {
          width: 8px;
          height: 5px;
          vertical-align: middle;
          margin-top: -1vw;
          margin-left: 2px;
        }
      }
      .unit {
        // width: 255px;
        height: 12px;
        font-size: 12px;
        line-height: 12px;
        text-align: right;
        color: #c1dfff;
        margin-right: 17px;
      }
    }
    .space {
      height: 100%;
      color: #fff;
      font-weight: 800;
      font-size: 30px;
      text-align: center;
      padding-top: 60px;
    }
  }
}
</style>