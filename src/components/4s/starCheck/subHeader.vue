<!--  -->
<template>
  <div class="subHeader">
    <h5>{{text}}</h5>
    <div>
      <span class="totalPoints">总分 {{totalPoints}}</span>
      <span class="deductMarks">扣分 {{deductMarks}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['text', 'totalPoints', 'deductMarks'],
  components: {
  },
  data () {
    return {

    }
  }
}
</script>
<style lang='scss' scoped>
.subHeader {
  display: flex;
  justify-content: space-around;
  height: 10.67vw;
  position: fixed;
  top: 25vw;
  width: 100%;
  z-index: 1;
  color: #767a7f;
  background: #f8f8f8;
  line-height: 10.67vw;
  .totalPoints {
    position: relative;
    color: #007aff;
    padding-right: 4vw;
  }
  .totalPoints::after {
    display: block;
    content: "";
    width: 1px;
    height: 2.67vw;
    position: absolute;
    right: 0;
    top: 50%;
    margin-top: -1.33vw;
    background: #007aff;
  }
  .deductMarks {
    color: #ff0718;
    padding-left: 4vw;
  }
}
</style>