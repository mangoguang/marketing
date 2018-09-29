<!-- <keep-alive> -->
<template>
  <li class="citySelect">
    <input @click="showCityList" type="input" v-model="cityMsg.cityName">
    <ul :class="{active: isActive}">
      <li
        v-for="(city, index) in cityList"
        :key="`${index}22`"
        @click="changeCity($event)"
        :title="city.level"
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
      cityMsg: {name: '苏州市', level: 2},
      cityList: [{name: '苏州市', level: 2}, {name: '广州', level: 1}],
      isActive: true
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
    this.changeCity()
  },
  methods: {
    ...mapMutations([
      'setCitySelect'
    ]),
    changeCity(e) {
      let [cityName, cityLevel, cityMsg] = ['', 1, {}]
      if (e) {
        let target = e.target
        cityName = target.innerText
        cityLevel = target.title
        cityMsg = {cityName: cityName, cityLevel: cityLevel}
        this.cityMsg = cityMsg
        this.setCitySelect(cityMsg)
        this.isActive = true
        // 将选择信息存储到本地
        localStorage.setItem('cityMsg', `{
          "cityName": "${cityName}",
          "cityLevel": "${cityLevel}"
        }`)
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
          _this.cityList = res.map((item) => {
            return {name: item.empowerCity, level: item.cityLevel}
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .citySelect{
    width: 25vw;
    height: 8vw;
    position: relative;
    margin: 0 1vw;
    ul{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      z-index: 1000;
    }
    li, input{
      display: block;
      width: 100%;
      height: 100%;
      background: #f8f8f8;
      text-align: center;
      border: 1px solid #e1e1e1;
      color: #666;
      font-weight: 300;
      border-top: none;
      line-height: 8vw;
    }
    li:first-child{
      border-top: 1px solid #e1e1e1;
      border-top-left-radius: 4vw;
      border-top-right-radius: 4vw;
    }
    li:last-child{
      border-bottom-left-radius: 4vw;
      border-bottom-right-radius: 4vw;
    }
    input{
      border-radius: 4vw;
      border: 1px solid #e1e1e1;;
    }
  }
  .active{
    display: none;
  }
</style>