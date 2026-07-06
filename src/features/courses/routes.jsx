import { lazy } from 'react';

export const coursesRoutes = [
  { path: '/courses', Component: lazy(() => import('@features/courses/pages/CoursesPage')) },
];
