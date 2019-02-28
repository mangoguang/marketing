import Mock from 'mockjs'
import data from '../data.json'

Mock.mock('/get/category1List', {
  code: 0,
  codeMsg: 'success',
  data: data.category1List
})
Mock.mock('/get/articleSearch',{
  code: 0,
  codeMsg: 'success',
  data: data.articleSearch
})