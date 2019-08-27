import Overview from './pages/overview';
import Project from './pages/project';
import Login from './pages/user/login';
import Register from './pages/user/register';

const routerConfig = [
  {
    path: '/dashboard/analysis',
    component: Overview,
    exact: true,
  },
  {
    path: '/project/list',
    component: Project,
    exact: true,
  },
];


const userRouterConfig = [
  {
    path: '/user/login',
    component: Login,
    exact: true,
  },
  {
    path: '/user/register',
    component: Register,
    exact: true,
  },
];

export { routerConfig, userRouterConfig };
