<!-- <keep-alive> -->
<template>
  <li class="citySelect" @click="showCityList">
    <!-- <input @click="showCityList" type="input" v-model="cityMsg.cityName"> -->
    <h5>
      地区
      <span>{{cityMsg.cityName}}</span>
    </h5>
    <!-- <button type="button">{{cityMsg.cityName}}</button> -->
    <ul v-show="!isActive" :class="{active: isActive}">
      <li
        v-for="(city, index) in cityList"
        :key="`${index}22`"
        @click.stop="changeCity($event)"
        :title="city.level"
        :class="{on: statusList[index]}"
        >{{city.name}}</li>
    </ul>
  </li>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
import Vuex, { mapState, mapMutations, mapGetters } from 'vuex'
Vue.use(Vuex)

import mango from '../../js'
export default {
  name: 'citySelect',
  data () {
    return {
      ajaxData: {},
      cityMsg: {name: '城市1', level: 2},
      cityList: [{name: '城市1', level: 2}, {name: '城市2', level: 1}, {name: '城市3', level: 1}, {name: '城市4', level: 1}],
      isActive: true,
      statusList: []
    }
  },
  created() {
    // 获取本地存储信息
    let cityMsg = localStorage.getItem('cityMsg')
    let ajaxData = localStorage.getItem('ajaxData')
    this.cityMsg = cityMsg ? JSON.parse(cityMsg) : {}
    this.ajaxData = JSON.parse(ajaxData)
    // 获取城市等级数据
    this.getCityLevel()
  },
  mounted() {
    for (let i = 0; i < this.cityList.length; i++) {
      this.statusList.push(false)
    }
    this.changeCity()
    this.cityActive(this.cityMsg.cityName)
  },
  methods: {
    ...mapMutations([
      'setCitySelect'
    ]),
    // 城市选中状态。
    cityActive(str) {
      for (let i = 0; i < this.cityList.length; i++) {
        this.statusList[i] = false
      }
      // 遍历查找所选城市的在城市列表的下标
      let cityIndex = (this.cityList.map(function(item) {
        return item.name
      })).indexOf(str)
      this.statusList[cityIndex] = true
    },
    changeCity(e) {
      let [cityName, cityLevel, cityMsg, _this] = ['', 1, {}, this]
      _this.isActive = true
      if (e) {
        let target = e.target
        cityName = target.innerText
        if (cityName !== this.cityMsg.cityName) {
          cityLevel = target.title
          cityMsg = {cityName: cityName, cityLevel: cityLevel}
          this.cityMsg = cityMsg
          // 选中状态
          this.cityActive(cityName)
          this.setCitySelect(cityMsg)
          // 将选择信息存储到本地
          localStorage.setItem('cityMsg', `{
            "cityName": "${cityName}",
            "cityLevel": "${cityLevel}"
          }`)
        }
      }
    },
    showCityList() {
      this.isActive = false
    },
    getCityLevel() {
      let _this = this
      mango.getAjax(this, 'getCityLevel', {
        tenantId: this.ajaxData.tenantId
      }).then((res) => {
        if (res) {
          res = res.data
          // 如果本地存储了城市选择，则选择本地存储，否则选择城市列表第一个城市
          if (!_this.cityMsg.cityName) {
            _this.cityMsg = {
              cityName: res[0].empowerCity,
              cityLevel: res[0].cityLevel
            }
          }
          _this.setCitySelect(_this.cityMsg)
          // _this.cityList = res.map((item) => {
          //   return {name: item.empowerCity, level: item.cityLevel}
          // })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .citySelect{
    font-family: PINGPANG;
    background: #f8f8f8;
    border-bottom: 1px solid #ccc;
    h5{
      position: relative;
      color: #666;
      font-weight: 300;
      line-height: 8vw;
      span{
        position: absolute;
        right: 0;
      }
    }
    ul{
      width: 100%;
      height: 100%;
      // padding-bottom: 2vw;
      li{
        display: inline-block;
        height: 8vw;
        line-height: 8vw;
        padding: 0 4vw;
        background: #e1e1e1;
        color: #666;
        border-radius: 4vw;
        margin: 0 2vw 2vw 0;
      }
      li.on{
        background: #007aff;
        color: #fff;
      }
    }
    &>li{
      color: #666;
      font-weight: 300;
      line-height: 8vw;
    }
  }
</style>