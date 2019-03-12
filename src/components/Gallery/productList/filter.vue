<template>
  <div class="filter">
    <div class="icon">
      <span class="line">|</span>
      <span>筛选</span>
      <img src="../../../assets/imgs/select.png" alt="筛选">
    </div>
    <div class="filter-box">
      <div class="contain right">
        <dl v-for="(item, index) in filterList" :key="index">
          <dt class="brand">{{ item.name }}</dt>
          <dd v-for="(el, i) in item.child" :key="el + '_' + i" 
            @click="getVal(index, i)"
            :class="{active : el.status}"
            :data-type='item.name'
            :data-name='el.name'>
            {{ el.name }}
          </dd>
        </dl>
        <div class="price">
          <p>价格区间</p>
          <div class="inp_box">
             <span>
                ¥<input type="text" v-model="price">
              </span>
              &nbsp;-&nbsp;
              <span>
                ¥<input type="text">
              </span>
          </div>
        </div>
        <div class="btn">
          <button class="reset">重置</button>
          <button class="confirm">完成</button>
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
        price: '',
        name: '',
        brand: '',
        nameVal: [],
        newList: []
    }
  },
  computed: {
    ...mapState({
      filterList: state => state.productNavList.filterList
    })
  },
  created() {
    this.setFilterList(this.list)
  },
  methods: {
    ...mapMutations(['setFilterList']),
    getList(index, i) {
      this.list.map((el,v) => {
        el.child.map((item, k) => {
          if(el.name == this.list[index].name) {
            this.$set(item, 'status', k == i)
            // item.status = k == i
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
    },
    getVal (index, i) {
      this.getList(index, i)
      console.log(11,this.list)
      // let dom = e.target;
      // let tagName = dom.tagName.toLowerCase();
      // if (tagName != "dd") {
      //   return false;
      // }
      // this.brand = dom.getAttribute("data-type");
      // this.name = dom.getAttribute("data-name");
      
      // console.log(this.name)
      // let temp = 0;
      // if(this.nameVal.length) {
      //   this.nameVal.forEach(item => {
      //     if(item.brand == this.list[index].name) {
      //       this.replaceVal(index, i)
      //     }else {
      //       temp += 1;
      //     }
      //     //如果第一级别都不同。添加选中的值
      //     if(temp == this.nameVal.length) {
      //       this.getNameVal(index, i)
      //     }
      //   });
      // }else {
      //   this.getNameVal(index, i)
      // }
      // this.checkVal(index, i)
      // console.log(this.nameVal)
    },
    checkVal(index, i) {
      console.log(this.nameVal)
      // this.nameVal.forEach(item => {
      //   if(item.name == this.list[index].child[i].name) {
      //     this.name = item.name
      //   }else {
      //     this.name = ''
      //   }
      // })
    },
    //相同的品牌替换选中的值
    replaceVal(index, i) {
      this.nameVal.map(item => {
        if(item.brand == this.list[index].name) {
          item.name = this.list[index].child[i].name
        }
      })
    },
    //获取选中的值
    getNameVal(index, i) {
      let obj = {
        brand: this.list[index].name,
        name: this.list[index].child[i].name
      }
      this.nameVal = [...this.nameVal, obj]
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
      padding-top: 2vw;
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


