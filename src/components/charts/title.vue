<!-- <keep-alive> -->
<template>
  <h3 class="chartsTit">{{text}}</h3>
</template>
<!-- </keep-alive> -->

<script>
import Vue from 'vue'
export default {
  name: 'chartsTit',
  props: ['text'],
  data () {
    return {

    }
  },
  beforeMount() {

  },
  mounted() {

  },
  updated() {

  },
  watch: {
    data(val){
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .chartsTit{
    position: relative;
    font-size: 22px;
    line-height: 3em;
    margin: 0 2vw;
    padding-left: 3vw;
  }
  .chartsTit::after{
    display: block;
    content: '';
    position: absolute;
    top: 22px;
    left: 0;
    width: .5vw;
    height: 22px;
    background: #000;
  }
</style>