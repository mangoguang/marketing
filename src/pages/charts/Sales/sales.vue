<!-- <keep-alive> -->
<template>
  <div class="sales">
    <mybanner :title="title" />
    <!-- <SelectComponent></SelectComponent> -->
    <myselect @getdata="getdata" :isBrand="false" />
    <mydate />
    <div class="barBox paddingTop3">
      <chartsTit :text="'整体销售额对比'">
        <h6>单位：万元</h6>
      </chartsTit>
      <!-- <div v-show="!salesShow" :style="{height: `100vw`}" ref="salesContainer"></div> -->
      <AllBar v-show="!salesShow" class="allSale" :domName="'allSale'" :props="salesData" />
      <noData v-show="salesShow"></noData>
      <RouterLink @click.native="toStoreSales" :text="shopTitle"></RouterLink>
    </div>
    <div class="barBox" v-if="shopShow">
      <chartsTit :text="'区域销售额对比'">
        <h6>单位：万元</h6>
      </chartsTit>
      <div v-show="!areaSalesShow" ref="areaSalesContainer" style="width:100vw"></div>
      <noData v-show="areaSalesShow"></noData>
      <!-- <RouterLink @click.native="toAreaStoreSales" :text="'各区域销售额对比'"></RouterLink> -->
    </div>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import echarts from "echarts";
import axios from "axios";
import Vue from "vue";
import VueRouter from "vue-router";
import mango from "../../../js";
import chartsInit, {
  chanrtDom,
  emptyData,
  emptybarData
} from "../../../utils/chartsInit";
import { waterMark } from "../../../utils/msManage";
Vue.use(VueRouter);
import Bar from "../../../components/charts/bar";
import chartsTit from "../../../components/charts/title";
import RouterLink from "../../../components/charts/routerLink";
import mybanner from "../../../components/banner";
import noData from "../../../components/charts/noData";
import myselect from "../../../components/charts/select";
import mydate from "../../../components/charts/dateTime";
import AllBar from "../../../components/charts/AllBar";
import Vuex, { mapState, mapMutations, mapGetters } from "vuex";
Vue.use(Vuex);
export default {
  name: "sales",
  components: {
    Bar,
    chartsTit,
    RouterLink,
    mybanner,
    noData,
    myselect,
    mydate,
    AllBar
  },
  computed: {
    ...mapState({
      areaIndex: state => state.chartSelect.areaIndex, //区域下标
      areaContent: state => state.chartSelect.areaContent //区域文本
    })
  },
  data() {
    return {
      ajaxData: {},
      // endTime: mango.getLocalTime('end'),
      salesData: {},
      areaSalesData: {},
      title: "销售额报表",
      // cityMsg: '',
      key1: false,
      key2: false,
      salchanrtDom1: "",
      salchanrtDom2: "",
      // 用于标记各个echart图表是否显示/隐藏
      salesShow: true,
      areaSalesShow: true,
      shopShow: true, //显示各区域报表
      shopTitle: "各门店销售额对比",
      id: "", //用户id,
      path: "/storeSales"
    };
  },
  created() {
    // 获取本地存储信息
    let [ajaxData, cityMsg] = [
      localStorage.getItem("ajaxData"),
      localStorage.getItem("cityMsg")
    ];
    // this.cityMsg = cityMsg ? JSON.parse(cityMsg) : {}
    // let ajaxData = localStorage.getItem('ajaxData')
    this.ajaxData = JSON.parse(ajaxData);
    if (this.ajaxData.typename == "Store Manager") {
      this.shopShow = false;
      this.shopTitle = "各员工销售额对比";
      this.path = "/personalSales";
    }
    this.id = this.ajaxData.tenantId;
    // let shops = localStorage.getItem('shops')
    // console.log('本地存储的shops:', JSON.parse(shops))
  },
  mounted() {
    // console.log('参数', this.cityMsg.cityName, this.endTime, this.cityMsg.cityLevel)
    // this.getSalesData(this.cityMsg.cityName, this.endTime, this.cityMsg.cityLevel)
    // this.getAreaSalesData(this.endTime)
    waterMark(".barBox");
  },
  watch: {
    // citySelect() {
    //   if (this.endTimeSelect && this.endTimeSelect != '') {
    //     // console.log(localStorage.getItem('cityMsg'))
    //     this.getSalesData(this.citySelect.cityName, this.endTimeSelect, this.citySelect.cityLevel)
    //   }
    // },
    // endTimeSelect() {
    //   if (this.endTimeSelect && this.endTimeSelect != '') {
    //     this.getSalesData(this.citySelect.cityName, this.endTimeSelect, this.citySelect.cityLevel)
    //     this.getAreaSalesData(this.endTimeSelect)
    //   }
    // },
    // 整体销售额对比
    // salesData() {
    //   const chartsName = 'sales'
    //   if(this.key1) {
    //     if (this[`${chartsName}Data`]) {
    //       if (this[`${chartsName}Data`].series) {
    //         // 检测数据是否为空
    //         this.salesShow = emptyPieData(this[`${chartsName}Data`].series)
    //         // console.log('是否显示echarts', this.salesShow)
    //         // chartsInit(this, chartsName, 'vertical', true)
    //         // this.salchanrtDom1 = chanrtDom
    //       }
    //     }
    //   }
    // },
    // 区域销售额对比
    areaSalesData() {
      const chartsName = "areaSales";
      if (this.key2) {
        if (this[`${chartsName}Data`]) {
          if (this[`${chartsName}Data`].series) {
            // 检测数据是否为空
            this.areaSalesShow = emptyData(this[`${chartsName}Data`].series);
            //chartsInit(this, chartsName, 'vertical', true)
            chartsInit(this, chartsName, "horizontal", true);
            this.salchanrtDom2 = chanrtDom;
          }
        }
      }
    }
  },
  beforeDestroy() {
    if (this.salchanrtDom1) {
      this.salchanrtDom1.dispose();
    }
    if (this.salchanrtDom2) {
      this.salchanrtDom2.dispose();
    }
  },
  methods: {
    // goToChild() {
    //   this.$router.push({ path: '/child' })
    // },
    toStoreSales() {
      if (this.ajaxData.typename == "Store Manager") {
        this.$router.push({ path: this.path + "?name=" + this.areaContent });
      } else {
        this.$router.push({ path: this.path });
      }
    },
    toAreaStoreSales() {
      this.$router.push({ path: "/areaStoreSales" });
    },
    getdata(val) {
      // console.log(val);
      localStorage.setItem("selectMsg", JSON.stringify(val));
      let { startDate, endDate, areaMsg, cityLevel } = val;
      if (this.ajaxData.typename == "Store Manager") {
        var data = {
          shopId: areaMsg,
          startDate,
          endDate
        };
      } else {
        var data = {
          cityName: areaMsg,
          cityLevel: cityLevel,
          startDate,
          endDate,
          tenantId: this.id
        };
        this.getAreaSalesData(data);
      }
      this.getSalesData(data);
    },
    // ajax请求
    getSalesData(params) {
      // console.log(params);

      let _this = this;
      mango
        .getAjax("/v2/app/report/getSumSales", params)
        .then(res => {
          if (res) {
            // console.log(res);
            let { status, data } = res;
            if (status) {
              var flag = emptybarData(data.series);
              data.series = data.series.map(item => {
                return {
                  data: [(item.data[0] / 10000).toFixed(2)],
                  name: item.name
                };
              });
              // console.log(data);

              this.salesData = data;
              this.salesShow = flag;
              // console.log(flag);
            }
            // this.key1 = true
            // res = res.data
            // mango.sortYears(res)
            // res.yAxisData = [mango.chartsBotTit(res)]
            // console.log(887799, res)
            // _this.salesData = res
          }
        })
        .catch(function(error) {
          console.log(11111, error);
        });
    },

    getAreaSalesData(params) {
      let _this = this;
      let obj = {
        tenantId: params.tenantId,
        startDate: params.startDate,
        endDate: params.endDate
      };
      mango.getAjax("/v1/app/dealer/report/area/sales", obj).then(res => {
        console.log(res);
        if (res) {
          this.key2 = true;
          res = res.data;
          _this.areaSalesData = res;
        }
      });
    },
    chartsEvent(data) {
      if (data.componentType === "series") {
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
 