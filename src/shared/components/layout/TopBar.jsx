import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSidebar from '@shared/hooks/useSidebar'
import useAuth from '@shared/hooks/useAuth'
import Avatar from '@shared/components/ui/Avatar'

export default function TopBar({ title = '' }) {
  const { toggle, open } = useSidebar()
  const { user, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-100 shadow-sm px-4 lg:px-6 h-16 flex items-center justify-between">
      {/* Left: hamburger + breadcrumb title */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggle}
          aria-label="Toggle sidebar"
          className="p-2 rounded-lg text-slate-500 hover:text-red-700 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
        {title && <h1 className="text-base font-semibold text-slate-800">{title}</h1>}
      </div>

      {/* Right: notifications + user */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate('/notifications')}
          className="relative p-2 rounded-lg text-slate-500 hover:text-red-700 hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label="Notifications"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* User menu */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <Avatar name={user?.name || user?.email} size="sm" />
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 z-20 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-medium text-slate-800 truncate">{user?.name || 'Administrator'}</p>
                  <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                </div>
                <MenuItem onClick={() => { navigate('/profile'); setMenuOpen(false) }}>Profile</MenuItem>
                <MenuItem onClick={() => { navigate('/settings'); setMenuOpen(false) }}>Settings</MenuItem>
                <div className="border-t border-slate-100" />
                <MenuItem onClick={handleLogout} danger>Sign out</MenuItem>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

function MenuItem({ children, onClick, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
        danger ? 'text-red-600 hover:bg-red-50' : 'text-slate-700 hover:bg-red-50'
      }`}
    >
      {children}
    </button>
  )
}
