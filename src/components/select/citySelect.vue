<!-- <keep-alive> -->
<template>
  <li class="citySelect">
    <input @click="showCityList" type="input" v-model="cityName">
    <ul :class="{active: isActive}">
      <li
        v-for="(city, index) in cityList"
        :key="`${index}22`"
        @click="changeCity($event)"
        >{{city}}</li>
    </ul>
  </li>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
export default {
  name: 'citySelect',
  data () {
    return {
      cityName: '苏州市',
      cityList: ['苏州市', '广州'],
      isActive: true
    }
  },
  mounted() {
    this.changeCity()
  },
  methods: {
    changeCity(e) {
      let city
      if (e) {
        let target = e.target
        city = target.innerText
        this.cityName = city
        this.isActive = true
      }
    },
    showCityList() {
      console.log('success')
      this.isActive = false
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
    }
    li:first-child{
      border-top: 1px solid #e1e1e1;
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