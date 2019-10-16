<template>
  <div class="filter">
    <div class="filter-box">
      <div class="left">
        <div class="select">
          <h3 :class="{rotate:showSelect}"
              @click="showSelect=!showSelect">{{selectName}}</h3>
          <div class="se-box"
               v-show="showSelect"
               @click="showSelect=false">
            <ul class="se-ul">
              <li :class="{active:selectIndex==index}"
                  v-for="(item,index) in selectList"
                  :key="index"
                  @click.stop="bindSelect(item,index)">{{item.name}}</li>
            </ul>
          </div>
        </div>
        <div class="adress"
             @click="$router.push({path:'/provice'})">{{provice||'全国'}}</div>
      </div>
      <div class="right">
        <div class="change"
             :class="{'change-list':changeList}"
             @click="bindChangeList"></div>
        <div class="line">|</div>
        <div class="fil">
          <h3 @click="showFilter=!showFilter">筛选</h3>
          <filter-select v-show="showFilter"
                         @onCloseFilter="onCloseFilter"></filter-select>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FilterSelect from './FilterSelect'
import { mapState } from 'vuex'
export default {
  components: {
    FilterSelect
  },
  props: {
    listStyle: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showFilter: false,
      changeList: false,
      showSelect: false,
      selectIndex: 0,
      selectName: '综合',
      selectList: [
        {
          name: '综合',
          type: 1
        },
        {
          name: '最新发布',
          type: 1
        },
        {
          name: '浏览量 ↑',
          type: 2
        },
        {
          name: '浏览量 ↓',
          type: 3
        },
        {
          name: '收藏量 ↑',
          type: 4
        },
        {
          name: '收藏量 ↓',
          type: 5
        }
      ]
    }
  },
  computed: {
    ...mapState({
      provice: state => state.caseStore.provice
    })
  },
  methods: {
    bindSelect(item, index) {
      this.selectName = item.name
      this.selectIndex = index
      this.showSelect = false
      this.$emit('onOrderType', item.type)
    },
    bindChangeList() {
      this.changeList = this.listStyle == 'cell-box' ? true : false
      this.$emit('onChangeList', this.changeList)
    },
    onCloseFilter(val) {
      this.showFilter = false
    }
  }
}
</script>
<style lang="scss" scoped>
$font-color: #666666;
.filter {
  height: 45px;
  position: relative;
  z-index: 99;

  .filter-box {
    height: 45px;
    padding: 0 11px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    position: fixed;
    box-sizing: border-box;
    width: 100%;
    .left {
      display: flex;
    }
    .right {
      display: flex;

      color: $font-color;

      .change {
        width: 35px;
        height: 45px;
        background: url(~@/assets/imgs/waterfall.png) center center / 13px 13px
          no-repeat;
      }
      .change-list {
        background: url(~@/assets/imgs/listStyle.png) center center / 13px 13px
          no-repeat;
      }
      .line {
        font-size: 12px;
        margin-right: 11px;
        line-height: 45px;
      }
      .fil {
        h3 {
          line-height: 45px;
          font-size: 15px;
          padding-right: 17px;
          background: url(~@/assets/imgs/case/筛选@2x.png) right center / 12px
            12px no-repeat;
        }
      }
    }
    .adress {
      padding-left: 17px;
      height: 45px;
      line-height: 45px;
      color: $font-color;
      padding-right: 20px;
      background: url(~@/assets/imgs/case/定位2@2x.png) right center / 12px 12px
        no-repeat;
    }
    .select {
      h3 {
        color: $font-color;
        font-size: 15px;
        line-height: 45px;
        display: flex;
        align-items: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 120px;
        &::after {
          display: block;
          content: '';
          width: 16px;
          height: 16px;
          background: url(~@/assets/imgs/down.png) center center / 8px 8px
            no-repeat;
          transition: transform 0.5s;
        }
      }
      .rotate {
        &::after {
          transform: rotate(-180deg);
        }
      }
      .se-box {
        position: absolute;
        left: 0;
        right: 0;
        top: 45px;
        bottom: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        .se-ul {
          background-color: #f8f8f8;
          padding: 0 11px;
          li {
            font-size: 15px;
            color: #909090;
            line-height: 40px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            padding-right: 42px;
          }
          .active {
            color: #363636;
            background: url(~@/assets/imgs/get.png) right center / 11px 11px
              no-repeat;
          }
        }
      }
    }
  }
}
</style>