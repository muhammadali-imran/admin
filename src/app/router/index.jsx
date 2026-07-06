import { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { dashboardRoutes } from '@features/dashboard/routes'
import { commonRoutes } from '@features/common/routes'
import { usersRoutes } from '@features/users/routes'
import { coursesRoutes } from '@features/courses/routes'
import { financeRoutes } from '@features/finance/routes'
import { settingsRoutes } from '@features/settings/routes'
import MainLayout from '@shared/layouts/MainLayout'

function LazyLoad({ children }) {
  return <Suspense fallback={<div className="app-shell">Loading…</div>}>{children}</Suspense>
}

function renderRoute({ path, Component }) {
  return (
    <Route
      key={path}
      path={path}
      element={
        <LazyLoad>
          <Component />
        </LazyLoad>
      }
    />
  )
}

export default function AppRouter() {
  const notFoundRoute = commonRoutes.find((route) => route.path === '*')
  const NotFoundPage = notFoundRoute?.Component

  return (
    <Routes>
      <Route element={<MainLayout title="Dashboard" />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {dashboardRoutes.map(renderRoute)}
        {usersRoutes.map(renderRoute)}
        {coursesRoutes.map(renderRoute)}
        {financeRoutes.map(renderRoute)}
        {settingsRoutes.map(renderRoute)}
      </Route>

      {NotFoundPage && (
        <Route
          path="*"
          element={
            <LazyLoad>
              <NotFoundPage />
            </LazyLoad>
          }
        />
      )}
    </Routes>
  )
}
