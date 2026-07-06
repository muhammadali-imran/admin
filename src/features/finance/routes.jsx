import { lazy } from 'react';

export const financeRoutes = [
  { path: '/finance', Component: lazy(() => import('@features/finance/pages/FinancePage')) },
];
