import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import activityFill from '@iconify/icons-eva/activity-fill';
import alertCircle from '@iconify/icons-eva/alert-circle-outline';
import playButton from '@iconify/icons-eva/arrow-right-outline';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: 'swing trade',
    path: '/dashboard/user',
    icon: getIcon(peopleFill)
  },
  {
    title: 'day trade',
    path: '/dashboard/realtime',
    icon: getIcon(activityFill)
  },
  {
    title: 'news',
    path: '/dashboard/news',
    icon: getIcon(alertCircle)
  },
  {
    title: 'favorites',
    path: '/dashboard/favorites',
    icon: getIcon(alertCircle)
  },
  {
    title: 'videos',
    path: '/dashboard/products',
    icon: getIcon(playButton)
  },
  {
    title: 'tutorials',
    path: '/dashboard/tutorials',
    icon: getIcon(playButton)
  }
];

export default sidebarConfig;
