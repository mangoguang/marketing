export default function getClassCN(storeClass) {
  let storeClassCN = ''
  switch (storeClass) {
    case 0: 
      storeClassCN =  '一'
      break
    case 1: 
      storeClassCN =  '二'
      break
    case 2: 
      storeClassCN =  '三'
      break
    case 3: 
      storeClassCN =  '四'
      break
    default:
      storeClassCN =  '五'
  }
  return storeClassCN
}