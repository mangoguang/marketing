<template>
  <h3><slot></slot></h3>
</template>

<style lang="scss" scoped>
h3{
  position: relative;
  font-size: 4.266vw;
  color: #007fff;
  line-height: 10.66vw;
  height:10.66vw;
  padding-left: 4vw;
  border-bottom: 1px solid #e1e1e1;
}
h3:after{
  content: '';
  display: block;
  position: absolute;
  width: 3px;
  height: 20px;
  left: 0;
  top: 50%;
  margin-top: -10px;
  background: #007fff;
}
</style>
