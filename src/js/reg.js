
    // 校验手机格式
export const testPhone = (phone) => {
      const phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
      return phoneReg.test(phone)
}

    // 校验人名
export const testName = (name) => {
  const nameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
  return nameReg.test(name)
}
    //校验微信号
  export const testWeChat = (name) => {
    const wechatReg = /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/
    return wechatReg.test(name)
  }

    

    


    

  

