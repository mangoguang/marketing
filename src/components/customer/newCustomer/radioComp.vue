<template>
  <div class="radio">
    <div class="comp">
      <input type="radio"
             name="radioComp"
             :id="textVal.id"
             :value="textVal.name"
             @change="updataInp"
             v-on:input="$emit('input', $event.target.value)"
             :checked="textVal.id == 1">
      <label :for="textVal.id">
        <i></i>
        <p class="one">{{ textVal.name }}</p>
      </label>
    </div>
  </div>
</template>
<script>
export default {
  props: ['textVal'],
  methods: {
    updataInp(el) {
      this.$emit('change', el.target.value)
    }
  }
}
</script>
<style lang="scss" scoped>
.radio {
  width: 100vw;
  margin-top: 18.33vw;
  margin-bottom: 8vw;
  box-sizing: border-box;
  .comp {
    display: flex;
    position: relative;
    min-width: 98px;
  }
  .comp [type='radio'] {
    display: none;
  }
  .comp label {
    display: block;
    i {
      display: inline-block;
      width: 4vw;
      height: 4vw;
      border-radius: 100%;
      margin-right: 80px;
      background: url(../../../assets/imgs/withoutChoose.png) no-repeat center;
      background-size: 100% 100%;
    }
  }
  .comp [type='radio']:checked + label i {
    box-sizing: border-box;
    background: url(../../../assets/imgs/choose.png) no-repeat center;
    background-size: 100% 100%;
    border-radius: 50%;
    width: 4.5vw;
    height: 4.5vw;
  }
  .one {
    position: absolute;
    top: -1vw;
    left: 5vw;
    font-size: 3.73vw;
    color: #373737;
  }
}
</style>
