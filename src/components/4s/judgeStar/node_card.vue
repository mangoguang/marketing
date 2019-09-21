<!--  -->
<template>
  <div class="bg">
    <div class="node_card">
      <h1 class="header">{{comfirmTitle}}</h1>
      <ul class="node_ul">
        <li class="node_li"
            v-for="(item, index) in cofirmList"
            :key="index">
          <div class="node_left_text">
            <p class="text">{{ department[index] }}</p>
            <div class="step "
                 :class="{'pass':item.passFail}">
              <div class="step-circle"></div>
            </div>
          </div>
          <div class="node_right_text">
            <div class="text"
                 v-for="(items) in item.typeList"
                 :key="items.id">
              <p>
                {{items.createTime}}
                <span @click="handleDetailClick(items)"
                      :class="{unPass:[2, 3, 6, 10, 13].includes(items.status)}&&[1,2,3].includes(items.type)">{{(items.status==3||items.status==1)&&items.type==9?'已认证': items.statusString}}</span>
              </p>
            </div>
            <div v-if="item&&item.length==0"
                 class="nodata">-</div>
          </div>
        </li>
      </ul>
      <div class="closeBtn"
           @click="handleCloseClick">知道了</div>
      <!-- <div class="time_line"
           :style="lineStyle">
        <div class="circle">
          <div class="inside"></div>
        </div>
        <div class="new_node"
             v-for="(item,index) in list2"
             :key="item + index">
          <div class="line"
               :class="{unshow: !item.type}"></div>
          <div class="circle"
               :class="{unshowCircle: !item.type}">
            <div class="inside"></div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { parseTime } from '@/utils/tools'
export default {
  props: ['cofirmList', 'star', 'status', 'comfirmTitle'], //几星
  data() {
    return {
      itemName: ['经销商', '区域片区', '4s认证部', '总部', '总部'],

      lineStyle: {}
    }
  },
  computed: {
    department() {
      if (this.cofirmList.length == 4) {
        this.itemName.splice(2, 1)
      }
      return this.itemName
    }
  },
  methods: {
    handleCloseClick() {
      this.$emit('onNodeCardClose', true)
    },
    handleDetailClick(items) {
      if (items.statusString == '未通过') {
        this.$router.push({
          path: '/attest-detail',
          query: {
            shopId: items.shopId,
            qualificationId: items.id, //认证id
            starLevelId: items.starLevelId, //星级1,2,3,4,5
            type: items.type //类型， 3：区域经理 评分项      4：4S
          }
        })
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
}
.node_card {
  width: 82.66vw;
  min-height: 116.2vw;
  background: #fff;
  border-radius: 1.2vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .header {
    background: #007aff;
    line-height: 11.2vw;
    color: #fff;
    font-size: 5.06vw;
    font-weight: bold;
    text-align: center;
    border-radius: 1.2vw 1.2vw 0 0;
    box-sizing: border-box;
  }
  .node_ul {
    padding: 0 2.8vw;
    padding-top: 6.13vw;
    box-sizing: border-box;
    max-height: 62vh;
    overflow: auto;
    padding-bottom: 45px;
    .node_li {
      min-height: 55px;
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      .node_left_text {
        flex: 0.2;
        padding-right: 6vw;

        position: relative;

        .text {
          color: #363636;
          font-size: 3.2vw;
          font-weight: 500;
          text-align: right;
        }
        .step {
          position: absolute;
          top: 8px;
          left: 63px;
          height: 100%;
          width: 2px;
          background: #f8f8f8;
          // background: #5ac8fa;
          .step-circle {
            width: 10px;
            height: 10px;
            background: rgba(144, 144, 144, 0.3);
            // background: rgba(90, 200, 250, 0.3);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: -2px;
            left: 50%;
            transform: translateX(-50%);
            &::after {
              content: '';
              display: block;
              width: 7px;
              height: 7px;
              // background: #5ac8fa;
              background: #909090;
              border-radius: 50%;
            }
          }
        }
        .pass {
          // background: #f8f8f8;
          background: #5ac8fa;
          .step-circle {
            // background: rgba(144, 144, 144, 0.3);
            background: rgba(90, 200, 250, 0.3);
            &::after {
              // background: #909090;
              background: #5ac8fa;
            }
          }
        }
      }
      .node_right_text {
        flex: 0.8;
        color: #666;
        font-size: 3.2vw;
        text-align: left;

        min-height: 55px;
        padding-bottom: 10px;
        .text {
          border-radius: 0px 1.6vw 1.6vw 1.6vw;
          border: 1px solid #e1e1e1;
          padding: 0 1.6vw;
          margin-bottom: 10px;
        }
      }
      &:last-child {
        .step {
          width: 0;
        }
      }
    }
  }
  .closeBtn {
    border-top: 1px solid #e1e1e1;
    line-height: 11.2vw;
    color: #007aff;
    font-size: 4.8vw;
    font-weight: 500;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    // z-index: 99;
    background: #fff;
    border-radius: 0 0 1.2vw 1.2vw;
  }
  .time_line {
    display: flex;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 68px;
    left: 68px;
  }
  .circle {
    width: 3.13vw;
    height: 3.13vw;
    background: rgba($color: #5ac8fa, $alpha: 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99;
    .inside {
      width: 2vw;
      height: 2vw;
      background: #5ac8fa;
      border-radius: 50%;
    }
  }

  .unshowCircle {
    background: rgba($color: #909090, $alpha: 0.3);
    z-index: 99;
    .inside {
      z-index: 99;
      background: rgba($color: #909090, $alpha: 1);
    }
  }
}
.line {
  height: 19.6vw;
  background: #5ac8fa;
  width: 0.5vw;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.new_node {
  display: flex;
  align-items: flex-end;
  position: relative;
  height: 19.6vw;
  top: -2px;
}
.unshow {
  background: #f8f8f8;
  opacity: 0.8;
}
.unPass {
  color: #ff2d55;
  text-decoration: underline;
}
</style>