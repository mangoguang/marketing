import Common from './common'


class Mango extends Common {
  constructor() {
    super()
    this.key = true
    this.customerAjaxParams = (tenantId) => {
      return {
        page: 1,   //页数
        limit: 30,    //每页条数
        u: '',   //1:紧急排序，0：非
        i: '',   //1关键排序
        uo: 0,   // 1:紧急排序，0：非
        io: 0,   // //1关键排序
        key: '',     //搜索关键字，电话或名字
        startTime: '',
        endTime: '',
        tut: 0,   //只看今天更新数据 ,优先级最高
        tenantId: tenantId
      }
    }
    this.chartsBotTit = (res) => {
      return `${res.yAxisData[0]}           ${res.yAxisData[1]}        ${res.yAxisData[2]}`
    }
  }
}

export default new Mango()