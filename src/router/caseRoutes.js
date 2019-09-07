let caseRoutes = [{
    path: '/my-case',
    name: 'MyCase',
    component: () => import('@/pages/case/my-case/Index')
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import('@/pages/case/my-case/Detail')
  }, {
    path: '/alter-case',
    name: 'AlterCase',
    component: () => import('@/pages/case/my-case/AlterCase')
  }
]

export default caseRoutes;