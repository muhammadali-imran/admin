import { lazy } from 'react';

export const scheduleRoutes = [
  { path: '/schedule', Component: lazy(() => import('@features/schedule/pages/SchedulePage')) },
];
