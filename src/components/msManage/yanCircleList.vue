<template>
  <ul class="list">
    <li v-for="(item,index) in link" :key="index">
      <!-- 新增query。传入下级的参数 -->
      <router-link 
        :to="{
          name:item.link,
          query:{id: item.id,name:item.name,type:1}
          }">
          <!-- 按照文档返回的参数修改图片参数名字 -->
        <div class="circle" :style="{backgroundColor:item.bgColor}">
          <img :src="item.iconUrl" alt="">  
        </div>
        <p>{{item.name}}</p>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props:['link', 'list'],
  data () {
    return {
  }
  }
 
}
</script>

<style lang="scss" scoped>
  .list{
    width:100vw;
    padding:4vw 6.6vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    flex-wrap: wrap;
    a{
      display: block;
      .circle{
        width: 16vw;
        height: 16vw;
        // width:.6rem;
        // height:.6rem;
        border-radius:50%;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 6.66vw;
          height: auto;
          // width:.31rem;
          // height:.31rem;
        }
      }
       p{
        text-align:center;
        color:#666;
        // font-size:.14rem;
        font-size:3.73vw;
      }
    }
  }
</style>