<template>
  <div class="searchBox">
      <label>
          <span class="search-icon"></span>
          <input type="text" :value="value"  @input="$emit('input',$event.target.value)">
      </label>
   </div>
</template>

<script>
export default {
  props:['value'],
  data(){
    return{

    }
  }
 
}
</script>

<style lang="scss" scoped>
.searchBox{
  position: fixed;
  top:16.466vw;
  left:0;
  right:0;
  background: #fff;
  height:11.733vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  label{
    display: flex;
    flex-direction: row;
    align-items: center;
    width:78.666vw;
    height:8vw;
    margin:0 auto;
    background: #F7F7F7;
    border-radius:4vw;
    padding:0 4vw;
    .search-icon{
      display: inline-block;
      width:4.266vw;
      height:4.266vw;
      background: url("../../assets/imgs/egg_search.png") no-repeat;
      background-size: 100% 100%;
    } 
  }
  input:-moz-input-placeholder{
    font-size: 4vw;
    color:#909090;
  }
  input::-moz-input-placeholder{
    font-size: 4vw;
    color:#909090;
  }
  input::-ms-input-placeholder{
    font-size: 4vw;
    color:#909090;
  }
  input::-webkit-input-placeholder{
    font-size: 4vw;
    color:#909090;
  }
  input{
    color:#363636;
    font-size: 3.466vw;
    padding:0 1.333vw;
    flex:1;
    border:none;
    outline: none;
    background: none;
  }
 
}
</style>
