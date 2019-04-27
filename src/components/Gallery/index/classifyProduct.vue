<template>
  <div class="classifyProduct">
    <div class="hot" v-if="isHot">
      <h1>产品分类</h1>
      <ul class="loopList">
          <li v-for="(item, index) in type.list" :key="index">
            <router-link :to='{name:"productList", query:{index:index, categoryName:item.name}}'>
              <div class="img">
                <img :src="item.img" alt="">
              </div>
              <p>{{ item.name }}</p>
            </router-link>
          </li>
      </ul>
    </div>
    <div class="brand" v-for="(item, index) in type.list" :key="index" v-else  >
      <div class="topBar">
        <h1>{{ item.categoryName }}</h1>
        <router-link :to='{name:"productList", query:{categoryName: item.categoryName, index:index}}'>
          <div class="more">
            <span>更多</span>
            <span class="icon_more"></span>
          </div>
        </router-link>
      </div>
      <ul class="loopList">
        <li v-for="(el, i) in item.products" :key='i + "_" + el'>
          <router-link :to='{name: "productDetails",query: {id: el.id}}'>
            <div class="img">
              <img :src="el.imgUrl" alt="">
            </div>
            <p class="productName">{{ el.name }}</p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  props: ['type'],
  data() {
    return {
      
    }
  },
  computed: {
    isHot () {
      if(this.type.name === '慕思') {
        return true
      }else {
        return false
      }
    }
  },
  methods: {
    
  }

}
</script>

<style lang="scss" scoped>
.classifyProduct {
  padding: 4vw;
  margin-bottom: 45vw;
  h1 {
    font-size: 3.46vw;
    color: #666;
    font-weight: normal;
  }
  .loopList {
    display: flex;
    // justify-content: space-between;
    flex-wrap: wrap;
    text-align: center;
    padding-top: 4vw;
    li {
      width: 33%;
      // flex: 0.3;
      color: #666;
      font-size: 3.2vw;
      padding-right: 1vw;
      box-sizing: border-box;
      padding-bottom: 4vw;
      .img {
        width: 21.33vw;
        height: 21.33vw;
        img {
          width: 21.33vw;
          height: 21.33vw;
        }
      }
      .productName {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
      }
    }
    li:nth-child(3n+0) {
      padding-right: 0
    }
  }
  .brand {
    width: 100%;
    .topBar {
      display: flex;
      justify-content: space-between;
      .more {
        font-size: 3.2vw;
        color: #007aff;
      }
      .icon_more {
        background: url(../../../assets/imgs/m-more.png) no-repeat center;
        background-size: 100% 100%;
        width: 1.33vw;
        height: 2.4vw;
        display: inline-block;
      }
    }
  }
}
a{ 
  text-decoration:none; 
  color:#666; 
}
p {
  word-wrap:break-word;
  word-break:break-all;
  // text-align: left;
}
</style>

