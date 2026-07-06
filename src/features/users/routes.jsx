import { lazy } from 'react';

export const usersRoutes = [
  { path: '/users', Component: lazy(() => import('@features/users/pages/UsersPage')) },
];
