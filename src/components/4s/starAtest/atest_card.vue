<!--  -->
<template>
  <div class="">
    <mt-loadmore :top-method="loadTop"
                 :bottom-method="loadBottom"
                 :bottom-all-loaded="allLoaded"
                 ref="loadmore"
                 :autoFill="false"
                 :bottomDistance="30">
      <div class="atest_card"
           v-for="(item,index) in dataList"
           :key="index">
        <div class="header">
          <div class="left_text">
            <p class="name">{{item.distributor}}</p>
            <p claas='star'>认证星级：{{item.approveLevel||'-'}}</p>
          </div>
          <div class="right_text">
            <img src="../../../assets/imgs/4s/via.png"
                 alt="">
          </div>
        </div>
        <div class="time">
          <p>检查周期：{{item.cycleCheckTotal}}周</p>
          <p>累计周期：{{item.accumulativeCycle}}周</p>
          <p>开始时间：{{item.checkStartTime}}</p>
        </div>
        <div class="buttMan">
          <div class="head_line"></div>
          <div class="head">
            <span>对接人信息</span>
            <div class="edit_btn"
                 @click="handleEdit(index)"
                 v-if="item.isEdit">
              <img src="../../../assets/imgs/4s/edit.png"
                   alt="">
            </div>
            <div class="edit"
                 v-else>
              <div class="closeBtn"
                   @click="handleCloseBtn(index)">
                <img src="../../../assets/imgs/4s/error.png"
                     alt="">
              </div>
              <div class="comfirmBtn"
                   @click="handleComfirmBtn(index)">
                <img src="../../../assets/imgs/4s/correct.png"
                     alt="">
              </div>
            </div>
          </div>
          <div class="content">
            <div class="name">
              <label for="name">姓名:</label>
              <input type="text"
                     id="name"
                     v-model="item.nameVal"
                     :readonly="item.isReadOnly"
                     :ref="'inputName'+index">
            </div>
            <div class="tel">
              <label for="tel">电话:</label>
              <input type="number"
                     id="tel"
                     v-model="item.telVal"
                     :readonly="item.isReadOnly">
            </div>
          </div>
          <div class="footer"></div>
        </div>
        <div class="atest">
          <button @click="bindApply(item)">发起申请</button>
        </div>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import { distributorList, distributorApply } from '@/api/4s'
import Vue from 'vue'
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
export default {
  data () {
    return {

      nameVal: '',
      telVal: '',
      dataList: [],
      allLoaded: false,
      page: 1
    };
  },
  created () {
    this._initData()
  },
  methods: {
    async  _initData (page = 1) {
      let { code, data } = await distributorList({ page, limit: 20 })
      data.list.map(item => {
        item.isEdit = true
        item.isReadOnly = true
      })
      this.dataList = page == 1 ? data.list : this.dataList.concat(data.list)
      this.allLoaded = false;
    },
    loadTop () {
      this.page = 1;
      this._initData()
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom () {
      this.page++
      this._initData(this.page)
      this.allLoaded = true;// 若数据已全部获取完毕
      this.$refs.loadmore.onBottomLoaded();
    },
    handleEdit (index) {
      let item = this.dataList[index]
      item.isEdit = !item.isEdit
      item.isReadOnly = !item.isReadOnly
      this.$refs['inputName' + index][0].focus()
    },
    handleCloseBtn (index) {
      let item = this.dataList[index]
      item.isEdit = !item.isEdit
      item.isReadOnly = !item.isReadOnly
      item.nameVal = ''
      item.telVal = ''
    },
    handleComfirmBtn (index) {
      let item = this.dataList[index]
      item.isEdit = !item.isEdit
      item.isReadOnly = !item.isReadOnly
      const val = {
        name: this.nameVal,
        tel: this.telVal
      }
      this.$emit('getMeg', val)
    },
    async  bindApply (item) {
      let { province, empowerCity } = item
      let { code, data } = await distributorApply({ province, empowerCity, agentName: item.nameVal, agentPhone: item.telVal, starLevel: item.approveLevel })
    }
  }
}
</script>
<style lang='scss' scoped>
.atest_card {
  width: 94.66vw;
  margin: 0 auto;
  margin-top: 2.4vw;
  background: #fff;
  border-radius: 2.4vw;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 1.6vw;
    padding-top: 4vw;
    box-sizing: border-box;
    .left_text {
      .name {
        color: #363636;
        font-size: 5.06vw;
        font-weight: bold;
      }
      .star {
        color-adjust: #363636;
        font-size: 4vw;
        font-weight: 500;
      }
    }
    .right_text {
      img {
        width: 12.2vw;
        height: 12.2vw;
      }
    }
  }
  .time {
    color: #666;
    font-size: 3.73vw;
    padding-left: 1.6vw;
  }
  .buttMan {
    width: 100%;
    height: 23.86vw;
    margin-top: 2.4vw;
    // border-top:1px solid #ff964c;
    // border-bottom:1px solid #ff964c;
    .head_line {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        border-top: 1px solid #ff964c;
        width: 200%;
        height: 200%;
        transform-origin: 0 0;
        transform: scale(0.5);
      }
    }
    .head {
      color: #ff964c;
      font-size: 3.73vw;
      display: flex;
      justify-content: space-between;
      padding: 1.4vw 2.4vw 0 1.6vw;
      box-sizing: border-box;
      height: 8vw;
      .edit_btn {
        img {
          width: 5.06vw;
          height: 5.06vw;
        }
      }
      .edit {
        display: flex;
      }
      .comfirmBtn,
      .closeBtn {
        padding: 0 3vw;
        img {
          width: 5.86vw;
          height: auto;
        }
      }
      .comfirmBtn {
        padding-right: 0;
      }
    }
    .content {
      padding: 0 2.4vw 0 1.6vw;
      box-sizing: border-box;

      .name,
      .tel {
        color: #ff964c;
        font-size: 3.73vw;
        line-height: 7vw;
      }
      #name,
      #tel {
        border-bottom: 1px solid #ff964c;
        color: #ff964c;
        width: 40vw;
        padding-left: 4vw;
        box-sizing: border-box;
      }
    }
    .footer {
      margin-top: 1.4vw;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        border-bottom: 1px solid #ff964c;
        width: 200%;
        height: 200%;
        transform-origin: 0 0;
        transform: scale(0.5);
      }
    }
  }
  .atest {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    padding: 2.26vw 1.6vw 1.6vw 1.6vw;
    box-sizing: border-box;
    button {
      width: 21.33vw;
      height: 8vw;
      border-radius: 4vw;
      background: rgba($color: #007aff, $alpha: 0.2);
      color: #007aff;
      font-size: 4vw;
      font-weight: 500;
      text-align: center;
    }
  }
}
</style>