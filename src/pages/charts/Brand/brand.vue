<!-- <keep-alive> -->
<template>
  <div class="brand">
    <mybanner :title="title" />
    <!-- <SelectComponent></SelectComponent> -->
    <myselect @getdata="getdata" :isBrand="false" />
    <mydate />
    <ul class="paddingTop3">
      <li v-for="(item, index) in brandData.series" :key="`${index}11`">
        <div v-if="!brandShow" class="barBox">
          <chartsTit :text="`各${typeName}金额占比-${item.name}`"></chartsTit>
          <Pie
            v-if="!brandPieShow[index]"
            :yAxisData="brandData.yAxisData"
            :seriesData="item.data"
            :title="`各${typeName}金额占比-${item.name}`"
            :category="`整体${typeName}占比`"
            :height="120"
          ></Pie>
          <noData v-if="brandPieShow[index]"></noData>
        </div>
      </li>
      <li>
        <div class="barBox">
          <!-- <chartsTit :text="'整体销售额对比'"></chartsTit> -->
          <chartsTit :text="`各${typeName}销售额对比`">
            <h6>单位：万元</h6>
          </chartsTit>
          <!-- <div ref="brandContainer" ></div> -->
          <Bar
            v-if="!brandShow"
            @chartsClick="chartsEvent"
            :data="brandData"
            :vertical="'horizontal'"
            :title="`各${typeName}金额对比`"
            :height="chartHeight"
            :salesVal="true"
            domName="sum"
          ></Bar>
          <noData v-if="brandShow"></noData>
        </div>
      </li>
    </ul>
    <ul>
      <li v-for="(item, index) in categoryData.series" :key="`${index}11`">
        <div v-if="!categoryShow" class="barBox">
          <chartsTit :text="`各${typeName}数量占比-${item.name}`"></chartsTit>
          <Pie
            v-if="!categoryPieShow[index]"
            :yAxisData="categoryData.yAxisData"
            :seriesData="item.data"
            :title="`各${typeName}数量占比-${item.name}`"
            :category="`各${typeName}数量占比`"
            :height="120"
          ></Pie>
          <noData v-if="categoryPieShow[index]"></noData>
        </div>
      </li>
      <li>
        <div class="barBox">
          <!-- <chartsTit :text="'整体销售额对比'"></chartsTit> -->
          <chartsTit :text="`各${typeName}数量对比`">
            <h6>单位：件</h6>
          </chartsTit>
          <!-- <div ref="categoryContainer" ></div> -->
          <Bar
            v-if="!categoryShow"
            :data="categoryData"
            :vertical="'horizontal'"
            :title="`各${typeName}数量对比`"
            :height="chartHeight"
            domName="count"
          ></Bar>
          <noData v-if="categoryShow"></noData>
        </div>
      </li>
    </ul>
  </div>
</template>
<!-- </keep-alive> -->

<script>
import axios from "axios";
import Vue from "vue";
import VueRouter from "vue-router";
import mango from "../../../js";
import chartsInit, {
  chanrtDom,
  emptyData,
  emptyPieData
} from "../../../utils/chartsInit";
import { waterMark } from "../../../utils/msManage";
import Vuex, { mapState, mapMutations, mapGetters } from "vuex";
import SelectComponent from "../../../components/select/selectComponent";
Vue.use(VueRouter);
Vue.use(Vuex);
import Bar from "../../../components/charts/bar";
import Pie from "../../../components/charts/pie";
import chartsTit from "../../../components/charts/title";
import RouterLink from "../../../components/charts/routerLink";
import mybanner from "../../../components/banner";
import noData from "../../../components/charts/noData";
import myselect from "../../../components/charts/select";
import mydate from "../../../components/charts/dateTime";
export default {
  name: "brand",
  components: {
    Bar,
    Pie,
    chartsTit,
    RouterLink,
    mybanner,
    SelectComponent,
    noData,
    myselect,
    mydate
  },
  data() {
    return {
      ajaxData: {},
      brandData: {},
      categoryData: {},
      type: this.$route.query.type,
      typeName: this.$route.query.type === "brand" ? "品牌" : "品类",
      port:
        this.$route.query.type === "brand"
          ? "/v2/app/report/brand/proportion"
          : "/v2/app/report/category/proportion",
      title: "",
      endTime: mango.getLocalTime("end"),
      key1: false,
      key2: false,
      brandchanrtDom1: "",
      brandchanrtDom2: "",
      brandShow: false,
      categoryShow: false,
      i: 0,
      brandPieShow: [false, false],
      categoryPieShow: [false, false],
      chartHeight:this.$route.query.type === "brand" ?180:140
    };
  },
  created() {
    // 获取本地存储信息
    let ajaxData = localStorage.getItem("ajaxData");
    this.ajaxData = JSON.parse(ajaxData);
    // this.getBrandData()
    this.title = this.typeName + "报表";
  },
  mounted() {
    // Vue.$set(0, {name: 1})
    // this.getBrandData(this.endTime)
    // this.getCategoryData(this.endTime)
    waterMark(".barBox");
  },
  computed: {
    test() {
      // console.log(333, this.$store)
    },
    ...mapState({
      // citySelect: state => state.select.citySelect,
      // startTimeSelect: state => state.select.startTimeSelect,
      // endTimeSelect: state => state.select.endTimeSelect
    })
  },
  watch: {
    // endTimeSelect() {
    //   if (this.endTimeSelect && this.endTimeSelect != '') {
    //     this.getBrandData(this.endTimeSelect)
    //     this.getCategoryData(this.endTimeSelect)
    //   }
    // },
    brandData() {
      // 参数说明：查看销售模块样例
      const chartsName = "brand";
      if (this.key2) {
        if (this[`${chartsName}Data`].series) {
          // // 检测数据是否为空
          this[`${chartsName}Show`] = emptyData(
            this[`${chartsName}Data`].series
          );
          chartsInit(
            this,
            chartsName,
            "horizontal",
            true,
            "",
            "",
            "",
            "",
            "",
            true
          );
          this.brandchanrtDom1 = chanrtDom;

          // if(this.i > 1){
          try {
            this.brandchanrtDom1.resize();
          } catch (error) {
            console.log(error);
          }
          // }
        }
      }
    },
    categoryData() {
      // 参数说明：查看销售模块样例
      const chartsName = "category";
      if (this.key2) {
        if (this[`${chartsName}Data`].series) {
          // // 检测数据是否为空
          this[`${chartsName}Show`] = emptyData(
            this[`${chartsName}Data`].series
          );
          chartsInit(
            this,
            chartsName,
            "horizontal",
            "",
            "",
            "",
            "",
            "",
            "",
            true
          );
          this.brandchanrtDom2 = chanrtDom;
          // if(this.i > 1) {
          try {
            this.brandchanrtDom2.resize();
          } catch (error) {
            console.log(error);
          }
          // }
        }
      }
    }
  },
  beforeDestroy() {
    //销毁实例
    if (this.brandchanrtDom1) {
      this.brandchanrtDom1.dispose();
    }
    if (this.brandchanrtDom2) {
      this.brandchanrtDom2.dispose();
    }
  },
  methods: {
    goToChild() {
      this.$router.push({ path: "/child" });
    },
    getdata(val) {
      // console.log(val);
      let { startDate, endDate, areaMsg, cityLevel } = val;
      if (this.ajaxData.typename == "Store Manager") {
        var data = {
          shopId: areaMsg,
          startDate,
          endDate
        };
      } else {
        var data = {
          startDate,
          endDate,
          tenantId: this.ajaxData.tenantId
        };
      }

      this.getBrandData(data);
      this.getCategoryData(data);
    },
    // ajax请求
    getBrandData(params) {
      var obj = Object.assign({}, params, { type: "sum" });
      // console.log(obj);

      this.i += 1;
      mango.loading("open");
      let _this = this;
      mango.getAjax(this.port, obj).then(res => {
        mango.loading("close");
        console.log(res);

        if (res) {
          this.key1 = true;
          res = res.data;
          // 过滤数组
          // let tempArr = res.yAxisData.map((item) => {
          //   let arr = item.split('-')
          //   return arr[1]
          // })
          // res.yAxisData = tempArr
          // console.log('数据:', res)
          // console.log(this.brandData);

          // console.log(this.brandData);
          setTimeout(() => {
            this.brandData = res;
            // this.brandData.sort((a,b)=>{return a.series[0].data-b.series[0].data})
            
          }, 100);
          // 判断对应的饼图数据是否为空
          let series = res.series;
          if (series) {
            series.forEach((element, index) => {
              // console.log('seriesData', series[index])
              this.brandPieShow[index] = emptyPieData(series[index].data);
            });
          }
          // 检测数据是否为空
          this.brandShow = emptyData(res.series);
        }
      });
    },
    getCategoryData(params) {
      var obj = Object.assign({}, params, { type: "count" });
      mango.loading("open");
      let _this = this;
      mango.getAjax(this.port, obj).then(res => {
        console.log(res);
        mango.loading("close");
        if (res) {
          this.key2 = true;
          res = res.data;
          // console.log('品类',)
          setTimeout(() => {
            this.categoryData = res;
            // this.data.sort((a,b)=>{return a.categoryData.series[0]-b.categoryData.series[0]})
          }, 100);

          // 判断对应的饼图数据是否为空
          let series = res.series;
          if (series) {
            series.forEach((element, index) => {
              this.categoryPieShow[index] = emptyPieData(series[index].data);
            });
          }
          // 检测数据是否为空
          this.categoryShow = emptyData(res.series);
        }
      });
    },
    chartsEvent(data) {
      if (data.componentType === "series") {
        this.$router.push({ path: "/brandCatogrySales" });
      }
      console.log("报表组件传回的数据：", data);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.brand {
  width: 100vw;
  height: 100vh;
  // background: #f8f8f8;
  // padding-top:16.5vw;
}
.main {
  width: 100vw;
  height: 100vw;
}
</style>
 