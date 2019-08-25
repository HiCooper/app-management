// 左侧菜单，概览和存储 bucket 列表
const sideMenuConfig = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'dashboard',
    children: [
      {
        name: '分析页',
        path: '/analysis',
        exact: true,
      },
      {
        name: '监控页',
        path: '/monitor',
        exact: true,
      },
      {
        name: '工作台',
        path: '/workplace',
        exact: true,
      },
    ],
  },
  {
    name: '应用',
    path: '/app',
    icon: 'appstore',
    children: [
      {
        name: '列表',
        path: '/list',
        exact: true,
      },
      {
        name: '添加',
        path: '/add',
        exact: true,
      },
    ],
  },
  {
    name: '项目',
    path: '/project',
    icon: 'project',
    children: [
      {
        name: '列表',
        path: '/list',
        exact: true,
      },
      {
        name: '添加',
        path: '/add',
        exact: true,
      },
    ],
  },
  {
    name: '服务器',
    path: '/server',
    icon: 'hdd',
    exact: true,
    children: [
      {
        name: '列表',
        path: '/list',
        exact: true,
      },
      {
        name: '添加',
        path: '/add',
        exact: true,
      },
    ],
  },
];

export default sideMenuConfig;
