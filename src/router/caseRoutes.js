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
    name: 'setail',
    component: () => import('@/pages/case/detail/Index'),
    meta: {
      title: '案例详情'
    }
  }, {
    path: '/alter-case',
    name: 'alterCase',
    component: () => import('@/pages/case/alter-case/Index'),
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
    component: () => import('@/pages/case/browse/Index'),
    meta: {
      title: '案例详情图片浏览'
    }
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import('@/pages/case/preview/Index'),
    meta: {
      title: '图片预览'
    }
  }
]

export default caseRoutes;