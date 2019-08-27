import Login from './pages/user/login';
import Register from './pages/user/register';
import Analysis from './pages/dashboard/analysis/Analysis';
import Monitor from './pages/dashboard/monitor/Monitor';
import Workplace from './pages/dashboard/workplace/Workplace';
import ProjectList from './pages/project/list';
import AppList from './pages/app/list';
import RegisterResult from './pages/user/register-result';

const routerConfig = [
  {
    path: '/dashboard',
    children: [
      {
        name: 'analysis',
        path: '/analysis',
        component: Analysis,
      },
      {
        name: 'monitor',
        path: '/monitor',
        component: Monitor,
      },
      {
        name: 'workplace',
        path: '/workplace',
        component: Workplace,
      },
    ],
  },
  {
    path: '/project',
    children: [
      {
        name: 'list',
        path: '/list',
        component: ProjectList,
      },
    ],
  },
  {
    path: '/app',
    children: [
      {
        name: 'list',
        path: '/list',
        component: AppList,
      },
    ],
  },
];

const userRouterConfig = [
  {
    path: '/user',
    children: [
      {
        name: 'login',
        path: '/login',
        component: Login,
      },
      {
        path: '/register',
        component: Register,
      },
      {
        path: '/register-result',
        component: RegisterResult,
      },
    ],
  },
];
export { routerConfig, userRouterConfig };
