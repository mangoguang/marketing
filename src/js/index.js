import Common from './common'

class Mango extends Common {
  constructor() {
    super()
    this.name = 'my name is mango'
    this.chartsBotTit = (res) => {
      return `${res.yAxisData[0]}           ${res.yAxisData[1]}        ${res.yAxisData[2]}`
    }
  }
}

export default new Mango()