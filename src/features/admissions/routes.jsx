import { lazy } from 'react';

export const admissionsRoutes = [
  { path: '/admissions', Component: lazy(() => import('@features/admissions/pages/AdmissionsPage')) },
];
