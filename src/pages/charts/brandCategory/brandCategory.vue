<template>
  <div>
    <v-touch v-on:swiperight="swiperright">
      <mybanner :title="title" />
      <!-- getdata:获取参数数据-->
      <myselect @getdata="getdata" :isBrand="true" />
      <mydate />
      <div class="barBox paddingTop3">
        <chartsTit :text="'销售金额对比'">
          <h6>单位：万元</h6>
        </chartsTit>
        <div v-show="!salesShow">
          <!-- domName:图表容器名称 props:图表数据-->
          <mybar domName="salesContainer" :props="momenyChart" />
        </div>
        <noData v-show="salesShow"></noData>
      </div>
      <div class="barBox">
        <chartsTit :text="'销售数量对比'">
          <h6>单位：件</h6>
        </chartsTit>
        <div v-show="!consalesShow">
          <!-- domName:图表容器名称 props:图表数据-->
          <mybar domName="consalesContainer" :props="countChart" />
        </div>
        <noData v-show="consalesShow"></noData>
      </div>
    </v-touch>
  </div>
</template>

<script>
import moment from "moment";
import mybanner from "../../../components/banner";
import myselect from "../../../components/charts/select";
import mydate from "../../../components/charts/dateTime";
import chartsTit from "../../../components/charts/title";
import noData from "../../../components/charts/noData";
import mybar from "../../../components/charts/mybar";
import { waterMark } from "../../../utils/msManage";
import { mapState, mapMutations } from "vuex";
import mango from "../../../js";
export default {
  data() {
    return {
      title: "品牌品类报表",
      // data: "", //报表数据
      // vertical: "horizontal", //水平方向
      salesShow: true, //是否显示图表
      consalesShow: true, //是否显示图表
      ajaxData: {}, //用户信息
      // cityMsg: {}, //本地城市列表
      // areaMsg: "",
      // brand: "", //品牌
      momenyChart: [], //金额报表数据
      countChart: [] // 数量报表数据
    };
  },
  computed: {
    ...mapState({
      startTimeSelect: state => state.chartSelect.startTimeSelect, //开始时间
      endTimeSelect: state => state.chartSelect.endTimeSelect, //结束时间
      brandContent: state => state.chartSelect.brandContent //品牌文本
    })
  },
  components: {
    mybanner,
    myselect,
    mydate,
    chartsTit,
    noData,
    mybar
  },
  methods: {
    // 右侧滑动
    swiperright() {
      this.$router.push({ path: "/ReportForms" });
    },
    // 获取金额数据
    async getMoney(param) {
      // console.log(param);
      this.momenyChart = [];
      let res = await mango.getAjax(
        "/v1/app/report/brand/category/sales",
        param
      );
      // 数据加载
      console.log(res);
      let { status, data } = res;
      if (status) {
        // 检测数据是否为空
        var flag = data.every(value => {
          value.totalMoney == 0;
        });
        // console.log(flag);
        this.salesShow = flag;
        data.forEach(item => {
          this.momenyChart.push({
            name: item.category,
            value: (item.totalMoney / 10000).toFixed(2)
            // value: item.totalMoney
          });
        });
      }
      // 排序
      this.momenyChart.sort((a,b)=>{ return a.value-b.value})

      // console.log(this.momenyChart);
    },
    // 获取数量数据
    async getCount(param) {
      // console.log(param);
      this.countChart = [];
      let res = await mango.getAjax(
        "/v1/app/report/brand/category/quantity",
        param
      );
      console.log(res);
      let { status, data } = res;
      if (status) {
        var flag = data.every(value => {
          value.sumQuantity == 0;
        });
        this.consalesShow = flag;
        // console.log(flag);
        data.forEach(item => {
          this.countChart.push({
            name: item.category,
            value: item.sumQuantity
          });
        });
      }
      // 排序
      this.countChart.sort((a,b)=>{ return a.value-b.value})
      // console.log(this.countChart);
    },
    // 获取选项内容
    getdata(val) {
      if (this.ajaxData.typename == "Store Manager") {
        var data = {
          shopId: val.areaMsg,
          brand: val.brand,
          startDate: val.startDate,
          endDate: val.endDate
        };
      } else {
        var data = {
          city: val.areaMsg,
          brand: val.brand,
          startDate: val.startDate,
          endDate: val.endDate
        };
      }
      // 遍历参数是否有效
      for (const key in data) {
        if (!data[key]) {
          return;
        }
      }
      // console.log(data)
      // 加载金额数据
      this.getMoney(data);
      // 加载数量数据
      this.getCount(data);
    }
  },
  created() {
    // 获取本地存储信息
    let ajaxData = localStorage.getItem("ajaxData");
    this.ajaxData = JSON.parse(ajaxData);
  },
  mounted() {
    waterMark(".barBox");
  },
  watch: {}
};
</script>