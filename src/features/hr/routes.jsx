import { lazy } from 'react';

export const hrRoutes = [
  { path: '/hr', Component: lazy(() => import('@features/hr/pages/HRPage')) },
];
