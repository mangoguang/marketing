<template>
  <div class="areaEffectiveness">
    <mybanner :title="title" />
    <!-- <SelectComponent></SelectComponent> -->
    <myselect @getdata="getdata" :isBrand="false" />
    <mydate />
    <div class="barBox paddingTop3">
      <chartsTit :text="'坪效-整体'">
        <h6>单位：元</h6>
      </chartsTit>
      <div
        v-show="!areaEffectivenessShow"
        :style="{height: `100vw`}"
        ref="areaEffectivenessContainer"
      ></div>
      <noData v-show="areaEffectivenessShow"></noData>
      <!-- <Bar
      :data="areaEffectivenessData"
      :vertical="'vertical'"
      :height="100"></Bar>-->
    </div>
    <div class="barBox" v-if="shopShow">
      <chartsTit :text="'坪效-各店'">
        <h6>单位：元</h6>
      </chartsTit>
      <div v-show="!areaEffectivenessShopShow" ref="areaEffectivenessShopContainer" style="width:100vw"></div>
      <noData v-show="areaEffectivenessShopShow"></noData>
      <!-- <Bar
      :data="areaEffectivenessShopData"
      :vertical="'horizontal'"
      :height="250"></Bar>-->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import VueRouter from "vue-router";
import mango from "../../../js";
import chartsInit, { chanrtDom, emptyData } from "../../../utils/chartsInit";
import { waterMark } from "../../../utils/msManage";
import Vuex, { mapState, mapMutations, mapGetters } from "vuex";
import SelectComponent from "../../../components/select/selectComponent";
Vue.use(VueRouter);
Vue.use(Vuex);
import Bar from "../../../components/charts/bar";
import chartsTit from "../../../components/charts/title";
import RouterLink from "../../../components/charts/routerLink";
import mybanner from "../../../components/banner";
import noData from "../../../components/charts/noData";
import myselect from "../../../components/charts/select";
import mydate from "../../../components/charts/dateTime";
export default {
  name: "areaEffectiveness",
  components: {
    Bar,
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
      areaEffectivenessData: {},
      areaEffectivenessShopData: {},
      title: "坪效报表",
      endTime: mango.getLocalTime("end"),
      cityMsg: "",
      areaEffchanrtDom1: "",
      areaEffchanrtDom2: "",
      key1: false,
      key2: false,
      i: 0,
      areaEffectivenessShow: false,
      areaEffectivenessShopShow: false,
      shopShow: true
    };
  },
  created() {
    // 获取本地存储信息
    let [ajaxData, cityMsg] = [
      localStorage.getItem("ajaxData"),
      localStorage.getItem("cityMsg")
    ];
    // this.cityMsg = cityMsg ? JSON.parse(cityMsg) : {}
    this.ajaxData = JSON.parse(ajaxData);
    if (this.ajaxData.typename == "Store Manager") {
      this.shopShow = false;
    }
  },
  mounted() {
    // this.getareaEffectivenessData(this.endTime, this.cityMsg.cityName, this.cityMsg.cityLevel)
    // this.getareaEffectivenessShopData(this.endTime, this.cityMsg.cityName, this.cityMsg.cityLevel)
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
    // citySelect() {
    //   if (this.endTimeSelect && this.endTimeSelect != '') {
    //     this.getareaEffectivenessData(this.endTimeSelect, this.citySelect.cityName, this.citySelect.cityLevel)
    //     this.getareaEffectivenessShopData(this.endTimeSelect, this.citySelect.cityName, this.citySelect.cityLevel)
    //   }
    // },
    // endTimeSelect() {
    //   if (this.endTimeSelect && this.endTimeSelect != '') {
    //     this.getareaEffectivenessData(this.endTimeSelect, this.citySelect.cityName, this.citySelect.cityLevel)
    //     this.getareaEffectivenessShopData(this.endTimeSelect, this.citySelect.cityName, this.citySelect.cityLevel)
    //   }
    // },
    areaEffectivenessData() {
      const chartsName = "areaEffectiveness";
      if (this.key1) {
        if (this[`${chartsName}Data`].series) {
          // 检测数据是否为空
          this[`${chartsName}Show`] = emptyData(
            this[`${chartsName}Data`].series
          );
          chartsInit(this, chartsName, "vertical");
          this.areaEffchanrtDom1 = chanrtDom;
        }
      }
    },
    areaEffectivenessShopData() {
      const chartsName = "areaEffectivenessShop";
      if (this.key2) {
        if (this[`${chartsName}Data`].series) {
          // 检测数据是否为空
          this[`${chartsName}Show`] = emptyData(
            this[`${chartsName}Data`].series
          );
          chartsInit(this, chartsName, "horizontal");
          this.areaEffchanrtDom2 = chanrtDom;
          if (this.i > 1) {
            try {
              this.areaEffchanrtDom2.resize();
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
    }
  },
  beforeDestroy() {
    //销毁实例
    if (this.areaEffchanrtDom1) {
      this.areaEffchanrtDom1.dispose();
    }
    if (this.areaEffchanrtDom2) {
      this.areaEffchanrtDom2.dispose();
    }
  },
  methods: {
    // 获取选取的参数数据
    getdata(val) {
      console.log(val);
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
          tenantId: this.ajaxData.tenantId
        };
        this.getareaEffectivenessShopData(data);
      }
      this.getareaEffectivenessData(data);
      
    },
    // 坪效-整体
    getareaEffectivenessData(params) {
      mango.loading("open");
      let _this = this;
      mango.getAjax("/v2/app/report/area/effectiveness", params).then(res => {
        mango.loading("close");
        if (res) {
          this.key1 = true;
          res = res.data;
          mango.sortYears(res);
          //res.yAxisData = [mango.chartsBotTit(res)]
          _this.areaEffectivenessData = res;
        }
      });
    },
    getareaEffectivenessShopData(params) {
      this.i += 1;
      mango.loading("open");
      let _this = this;
      mango
        .getAjax("/v1/app/dealer/report/area/effectiveness/shop", params)
        .then(res => {
          mango.loading("close");
          if (res) {
            let newData = mango.getNewArr(res.data.series[0].data,res.data.series[1].data,res.data.yAxisData,res.data.idsData)
            this.$set(res.data,'idsData',newData[3])
            this.$set(res.data.series[0],'data',newData[1])
            this.$set(res.data.series[1],'data',newData[2])
            this.$set(res.data,'yAxisData',newData[0])
            // res.data.series.forEach(item=>{
            //   item.data.forEach(item2=>{
            //     console.log(item2==undefined)
                
            //   })
            // })
            // console.log(res.data);
            
            this.key2 = true;
            res = res.data;
            // _this.height = 200
            _this.areaEffectivenessShopData = res;
          }
        });
    }
  }
};
</script>

