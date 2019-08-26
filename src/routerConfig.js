import Overview from './pages/Overview';
import ProjectHome from './pages/ProjectHome';
import Login from './pages/Login';
import Register from './pages/Register';

const routerConfig = [
  {
    path: '/dashboard/analysis',
    component: Overview,
    exact: true,
  },
  {
    path: '/project/list',
    component: ProjectHome,
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
