let caseRoutes = [{
    path: '/case',
    name: 'Case',
    component: () => import('@/pages/case/index/Index'),
    meta: {
      title: '案例主页'
    }
  },
  {
    path: '/my-case',
    name: 'MyCase',
    component: () => import('@/pages/case/my-case/Index'),
    meta: {
      title: '我的案例'
    }
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@/pages/case/my-case/Detail'),
    meta: {
      title: '案例详情'
    }
  }, {
    path: '/alter-case',
    name: 'AlterCase',
    component: () => import('@/pages/case/alter-case/Index'),
    meta: {
      title: '新增、修改案例'
    }
  },
  {
    path: '/provice',
    name: 'Provice',
    component: () => import('@/pages/case/provice/Index'),
    meta: {
      title: '获取省份城市'
    }
  }
]

export default caseRoutes;