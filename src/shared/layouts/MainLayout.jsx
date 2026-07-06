import { Outlet } from 'react-router-dom'
import Sidebar from '@shared/components/layout/Sidebar'
import TopBar from '@shared/components/layout/TopBar'
import Footer from '@shared/components/layout/Footer'
import useSidebar from '@shared/hooks/useSidebar'

export default function MainLayout({ title }) {
  const { open } = useSidebar()

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      {/* Main content shifts right based on sidebar state */}
      <div
        className={`flex flex-col flex-1 min-w-0 transition-all duration-300 ${
          open ? 'lg:ml-64' : 'lg:ml-16'
        }`}
      >
        <TopBar title={title} />

        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  )
}
