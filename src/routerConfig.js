import Overview from './pages/Overview';
import ProjectHome from './pages/ProjectHome';

const routerConfig = [
  {
    path: '/dashboard/analysis',
    component: Overview,
  },
  {
    path: '/project/list',
    component: ProjectHome,
  },
];

export default routerConfig;
