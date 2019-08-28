import Login from './pages/user/login';
import Register from './pages/user/register';
import Analysis from './pages/dashboard/analysis/Analysis';
import Monitor from './pages/dashboard/monitor/Monitor';
import Workplace from './pages/dashboard/workplace/Workplace';
import ProjectList from './pages/project/list';
import AppList from './pages/app/list';
import AppDetail from './pages/app/detail';
import AppConfig from './pages/app/config';
import ServerList from './pages/server/list';
import RegisterResult from './pages/user/register-result';

const routerConfig = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    children: [
      {
        name: '分析页',
        path: '/analysis',
        component: Analysis,
      },
      {
        name: '监控页',
        path: '/monitor',
        component: Monitor,
      },
      {
        name: '工作台',
        path: '/workplace',
        component: Workplace,
      },
    ],
  },
  {
    path: '/project',
    name: '项目',
    children: [
      {
        name: '列表',
        path: '/list',
        component: ProjectList,
      },
    ],
  },
  {
    path: '/server',
    name: '服务器',
    children: [
      {
        name: '列表',
        path: '/list',
        component: ServerList,
      },
    ],
  },
  {
    path: '/app',
    name: '应用',
    children: [
      {
        name: '列表',
        path: '/list',
        component: AppList,
      },
      {
        name: '详情',
        path: '/detail',
        component: AppDetail,
      },
      {
        name: '配置',
        path: '/config',
        component: AppConfig,
      },
    ],
  },
];

const userRouterConfig = [
  {
    path: '/user',
    name: '用户',
    children: [
      {
        name: '登录',
        path: '/login',
        component: Login,
      },
      {
        name: '注册',
        path: '/register',
        component: Register,
      },
      {
        name: '注册结果',
        path: '/register-result',
        component: RegisterResult,
      },
    ],
  },
];
export { routerConfig, userRouterConfig };
