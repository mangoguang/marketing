<!--  -->
<template>
  <div class="itemDetails">
    <div class="header">
      <banner :title="$route.query.name"
              :left='true' />
    </div>
    <div class="content">
      <select-list :standards="standards"
                   @getActiveData="getActiveData" />
      <swiperPic :sliders="standardinfo.urls" />
      <div class="rule-box">
        <div class="range-rule">
          <span class="tips">扣{{standardinfo.deduct}}分</span>
          <div class="top"><span>0</span><span>{{standardinfo.deductLimit}}</span></div>
          <div class="rule">
            <div class="li"></div>
            <div class="li"></div>
            <div class="li"></div>
            <div class="li lis"></div>
            <div class="li"></div>
            <div class="li"></div>
            <div class="li"></div>
          </div>
          <div class="bottom">
            <div class="range"
                 :style="{width:rangeWidth}"></div>
          </div>
        </div>
      </div>
      <div class="reason">
        <p class="reason_title">扣分原因:</p>
        <p class="reason_content">
          {{standardinfo.reason||'-'}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import banner from '../../../components/banner'
import selectList from '../../../components/4s/record/itemDetails/selectList'
import swiperPic from '../../../components/4s/record/itemDetails/swiperPic'
import { gradeDetailList, gradeDetailInfo } from '@/api/4s'
import { Toast } from 'mint-ui'

export default {
  components: {
    banner,
    selectList,
    swiperPic
  },
  data () {
    return {
      list: [
        {
          text: '店面面积',
          score: '1'
        }, {
          text: '店面类型',
          score: '2'
        }, {
          text: '装修时间/到期时间',
          score: '2'
        }
      ],
      standards: [{ name: '', standardId: '' }],
      standardinfo: {
        deduct: 0,
        reason: '-',
        urls: []
      }
    };
  },
  created () {
    this._initData()
  },
  computed: {
    rangeWidth () {
      return this.standardinfo.deduct / this.standardinfo.deductLimit * 100 + '%'
    }
  },
  methods: {
    async  _initData () {
      let { shopId, qualificationId, id, type } = this.$route.query
      let { code, data } = await gradeDetailList({ shopId, qualificationId, id, type });
      if (data.length > 0) {
        this.standards = data
      } else {
        Toast('暂无数据');
        this.$router.go(-1)
      }
      this._getStandardinfo({ id: data[0].id })
    },
    async _getStandardinfo (params) {
      let { code, data } = await gradeDetailInfo(params)
      if (data) {
        let urlArr = []
        data.attachment.map(item => {
          urlArr.push(item.urlArr)
        })
        data.urls = urlArr
        this.standardinfo = data

      }
    },
    //获取下啦选择框的值
    getActiveData (val) {
      this._getStandardinfo({ id: val.id })

    }
  }
}
</script>
<style lang='scss' scoped>
.rule-box {
  width: 92vw;
  margin: 0 4vw;
  .range-rule {
    width: 245px;
    margin: 0 auto;
    position: relative;
    padding-top: 19px;
    .bottom {
      width: 245px;
      height: 12px;
      background: rgba(245, 245, 245, 1);
      border-radius: 6px;
      .range {
        width: 0px;
        height: 12px;
        background: linear-gradient(
          90deg,
          rgba(255, 187, 2, 1),
          rgba(255, 161, 91, 1),
          rgba(255, 106, 93, 1)
        );
        border-radius: 6px;
      }
    }
    .top {
      display: flex;
      justify-content: space-between;
    }
    .rule {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .li {
        border-left: 2px solid #bdc3cf;
        height: 4px;
      }
      .lis {
        height: 12px;
      }
    }
  }

  .tips {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    margin-left: 8px;
    display: block;
    width: 12.8vw;
    height: 8.1vw;
    font-size: 12px;
    line-height: 6.6vw;
    color: #e4675b;
    text-align: center;
    background: url(../../../assets/imgs/4s/starCheck/msg.png) no-repeat;
    background-size: 100%;
  }
}
.itemDetails {
  width: 100vw;
  background: #fff;
  // height: 100vh;
  // overflow: hidden;
  // min-height: 100vh;
  .header {
    width: 100vw;
    height: 18vw;
  }
  .score-slide {
    padding: 10.66vw 16vw;
  }
  .reason {
    padding: 40px 16vw;
    .reason_title {
      color: #7c7c7c;
      font-weight: 500;
      font-size: 3.46vw;
    }
    .reason_content {
      color: #303030;
      font-weight: 500;
      font-size: 3.46vw;
    }
  }
}
</style>