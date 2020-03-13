import Analysis from './pages/Dashboard/Analysis/Analysis';
import Monitor from './pages/Dashboard/Monitor/Monitor';
import Workplace from './pages/Dashboard/Workplace/Workplace';
import ProjectList from './pages/Project/List';
import ServerList from './pages/Server/List';
import AppList from './pages/App/List';
import AppDetail from './pages/App/Detail';
import AppConfig from './pages/App/Config';
import Setting from './pages/Setting';
import Login from './pages/User/Login';
import Register from './pages/User/Register';
import RegisterResult from './pages/User/RegisterResult';

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
  {
    path: '/setting',
    name: '系统设置',
    component: Setting,
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
