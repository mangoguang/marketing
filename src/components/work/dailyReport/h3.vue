<template>
  <h3><slot></slot></h3>
</template>

<style lang="scss" scoped>
h3{
  position: relative;
  font-size: 16px;
  font-size: 300;
  color: #007fff;
  line-height: 3em;
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
