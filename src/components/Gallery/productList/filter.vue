<template>
  <div class="filter">
    <div class="icon" @click="showFilter">
      <span class="line">|</span>
      <span>筛选</span>
      <img src="../../../assets/imgs/select.png" alt="筛选">
    </div>
    <div class="filter-box" v-show="filterStatus"  @click.self="hideBox">
      <div class="contain right">
        <!-- <dl v-for="(item, index) in filterList" :key="index">
          <dt class="brand">{{ item.name }}</dt>
          <dd v-for="(el, i) in item.child" :key="el + '_' + i" 
            @click="chooseVal(index, i)"
            :class="{active : el.status}"
            >
            {{ el.name }}
          </dd>
        </dl> -->
        <div class="price">
          <p>价格区间</p>
          <div class="inp_box">
             <span>
                ¥<input type="number" ref="inputPrice1" maxlength="8" 
                  v-model="price1" 
                  @change="changePrice">
              </span>
              &nbsp;-&nbsp;
              <span>
                ¥<input type="number" ref="inputPrice2" maxlength="8" 
                  v-model="price2"
                  @change="changePrice">
              </span>
          </div>
        </div>
        <div class="btn">
          <button class="reset" @click="reset">重置</button>
          <button class="confirm" @click="confirm">完成</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data() {
    return {
      filterStatus: false,
      list: [{
        name: '品牌',
        child: [{
          name: '歌蒂娅',
          id: '1'
        },{
          name: '凯奇',
          id: '2'
        },{
          name: '3D',
          id: '3'
        },{
          name: '0769',
          id: '4'
        },{
          name: 'V6',
          id: '5'
        },{
          name: '幕思儿童',
          id: '6'
        }]},{
          name: '风格',
          child: [{
          name: '时尚风',
          id: '1'
        },{
          name: '简约风',
          id: '2'
        },{
          name: '欧美风',
          id: '3'
        }]},{
          name: '材质',
          child: [{
            name: '皮质',
            id: '1'
          },{
            name: '布艺',
            id: '2'
          }]
        }],
        price1: '',
        price2: ''
    }
  },
  computed: {
    ...mapState({
      filterList: state => state.productNavList.filterList,
      filterVal: state => state.productNavList.filterVal
    })
  },
  created() {
    this.setFilterList(this.list)
  },
  methods: {
    ...mapMutations(['setFilterList', 'getFilterVal', 'resetFilterList']),
    //出现筛选框
    showFilter() {
      this.filterStatus = true
    },
    //隐藏筛选框
    hideBox() {
      this.filterStatus = false
    },
    //获取筛选的值
     chooseVal (index, i) {
      this.getList(index, i)
    },
    //获取新列表
    getList(index, i) {
      this.list.map((el,v) => {
        el.child.map((item, k) => {
          if(el.name == this.list[index].name) {
            if(item.status) {
              this.$set(item, 'status', false)
            }else {
              this.$set(item, 'status', k == i)
            }
          }else {
            if(item.status) {
              this.$set(item, 'status', true)
            }else {
              this.$set(item, 'status', false)
            }
          }
        })
      })
      this.setFilterList(this.list)
      this.getFilterVal()
      //=======每点击一次发一个请求。防抖500ms
    },
    //判断区间第一个值与第二个值相比
    changePrice() {
      if(this.price2) {
        if(parseInt(this.price1) > parseInt(this.price2)) {
          this.price2 = ''
          this.$refs.inputPrice2.focus()
        }else {
          console.log('send')
          ///发送请求
        }
      }
    },
    //重置筛选框,清空选中的值
    reset() {
      this.resetFilterList(this.list)
      this.getFilterVal()
      //重置发送请求
    },
    //确认
    confirm() {
      this.filterStatus = false
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {
  margin-right: 4vw;
  margin-top: -0.6vw;
  .icon {
    color: #666;
    font-size: 4vw;
    .line {
      color: #e1e1e1;
      margin-right: 1vw;
    }
    img {
      width: 2.4vw;
      height: 2.4vw;
    }
  }
  .filter-box {
    z-index: 999;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.5);
    width: 100vw;
    height: 100vh;
    .contain {
      background: #fff;
      height: 100%;
      width: 80vw;
      padding-top: 12vw;
      box-sizing: border-box;
      overflow: scroll;
      padding-bottom: 22vw;
      dl {
        padding:0 4.4vw;
        dt {
          color: #999;
          font-size: 3.73vw;
        }
        dd {
          background: #f8f8f8;
          border-radius: 1.6vw;
          width: 20vw;
          text-align: center;
          margin-bottom: 2.66vw;
          color: #666;
          display: inline-block;
          margin-right: 2.66vw;
        }
      }
      .price {
        padding: 0 4.4vw;
        color: #999;
        .inp_box {
          display: flex;
          span {
            padding-left: 2vw;
            color: #666;
            background: #f8f8f8;
            border-radius: 1.6vw;
            width: 20vw;
            line-height: 10.66vw;
            display: flex;
            box-sizing: border-box;
            input {
              width: 12vw;
              margin-left: 2vw;
              color: #666;
            }
          }
        } 
      }
      .btn {
        position: fixed;
        bottom: 0;
        right: 0;
        display: flex;
        button {
          width: 40vw;
          height: 22vw;
          font-size:4.53vw; 
        }
        .reset {
          background: #b2d7ff;
          color: #007aff;
        }
        .confirm {
          background: #007aff;
          color: #fff;
        }
      }
      .active {
        background: #b2d7ff;
        color: #007aff;
      }
    }
  }
}
</style>


