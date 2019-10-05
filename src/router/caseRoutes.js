let caseRoutes = [{
    path: '/case',
    name: 'case',
    component: () => import('@/pages/case/index/Index'),
    meta: {
      title: '案例主页'
    }
  },
  {
    path: '/my-case',
    name: 'myCase',
    component: () => import('@/pages/case/my-case/Index'),
    meta: {
      title: '我的案例'
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('@/pages/case/Detail'),
    meta: {
      title: '案例详情'
    }
  }, {
    path: '/alterCase',
    name: 'alterCase',
    component: () => import('@/pages/case/AlterCase'),
    meta: {
      title: '新增、修改案例'
    }
  },
  {
    path: '/provice',
    name: 'provice',
    component: () => import('@/pages/case/provice/Index'),
    meta: {
      title: '获取省份城市'
    }
  },
  {
    path: '/browse',
    name: 'browse',
    component: () => import('@/pages/case/Browse'),
    meta: {
      title: '案例详情图片浏览'
    }
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import('@/pages/case/Preview'),
    meta: {
      title: '图片预览'
    }
  },
  {
    path: '/searchType',
    name: 'searchType',
    component: () => import('@/pages/case/SearchType'),
    meta: {
      title: '产品型号搜索'
    }
  },
  {
    path: '/searchCenter',
    name: 'searchCenter',
    component: () => import('@/pages/case/SearchCenter'),
    meta: {
      title: '产品中心搜索案例',
      keepAlive: true
    }
  }
]

export default caseRoutes;