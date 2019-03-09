<template>
  <div class="classifyProduct">
    <div class="hot" v-show="false">
      <h1>产品分类</h1>
      <ul class="loopList">
          <li v-for="(item, index) in list" :key="index">
            <router-link to='/'>
              <img :src="item.src" alt="">
              <p>{{ item.name }}</p>
            </router-link>
          </li>
      </ul>
    </div>
    <div class="brand" v-for="(item, index) in bedList" :key="index">
      <div class="topBar">
        <h1>{{ item.brand }}</h1>
        <router-link :to='{name: item.brand}'>
          <div class="more">
            <span>更多</span>
            <span class="icon_more"></span>
          </div>
        </router-link>
      </div>
      <ul class="loopList">
        <li v-for="(el, i) in item.list" :key='i + "_" + el'>
          <img :src="el.src" alt="">
          <p>{{ el.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [{
        src: './static/images/b1.png',
        name: '床'
      },{
        src: './static/images/b2.png',
        name: '床垫'
      },{
        src: './static/images/b3.png',
        name: '枕类'
      },{
        src: './static/images/b4.png',
        name: '排骨架'
      },{
        src: './static/images/b5.png',
        name: '床头柜'
      },{
        src: './static/images/b6.png',
        name: '床品'
      },{
        src: './static/images/b7.png',
        name: '助眠类'
      },{
        src: './static/images/b8.png',
        name: '桌椅类'
      },{
        src: './static/images/b9.png',
        name: '其他'
      }],
      bedList: [{
        brand:'床',
        list: [{
          src: './static/images/bb1.png',
          name: 'BCG1-015'
        },{
          src: './static/images/bb2.png',
          name: 'BCG1-016'
        },{
          src: './static/images/bb3.png',
          name: 'BCG1-017'
        },{
          src: './static/images/bb4.png',
          name: 'BCG1-018'
        },{
          src: './static/images/bb5.png',
          name: 'BCG1-019'
        },{
          src: './static/images/bb6.png',
          name: 'BCG1-020'
        }]
      },{
        brand:'床垫',
        list: [{
          src: './static/images/w1.png',
          name: 'MCG1-015'
        },{
          src: './static/images/w2.png',
          name: 'MCG1-016'
        },{
          src: './static/images/w3.png',
          name: 'MCG1-017'
        },{
          src: './static/images/w4.png',
          name: 'MCG1-018'
        },{
          src: './static/images/w5.png',
          name: 'MCG1-019'
        },{
          src: './static/images/w6.png',
          name: 'MCG1-020'
        }]
      }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.classifyProduct {
  padding: 4vw;
  h1 {
      font-size: 3.46vw;
      color: #666;
      font-weight: normal;
    }
  .loopList {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    text-align: center;
    li {
      flex: 0.3;
      color: #666;
      font-size: 3.2vw;
      img {
        width: 21.33vw;
        height: 21.33vw;
      }
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
</style>

