import Overview from './pages/Overview';
import ProjectHome from './pages/ProjectHome';

const routerConfig = [
  {
    path: '/dashboard',
    component: Overview,
  },
  {
    path: '/project',
    component: ProjectHome,
  },
];

export default routerConfig;
