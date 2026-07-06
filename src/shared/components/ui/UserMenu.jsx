import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '@shared/hooks/useAuth'
import Avatar from '@shared/components/ui/Avatar'
import { 
  User, 
  Settings, 
  Bookmark, 
  MessageSquare, 
  LogOut 
} from 'lucide-react';



/**
 * Standalone user dropdown menu.
 * Already embedded in TopBar; use this as an extraction for reuse.
 *
 * <UserMenu />
 */
export default function UserMenu() {
  const { user, logout } = useAuth()
  const navigate  = useNavigate()
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  const go = (path) => {
    navigate(path)
    close()
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
    close()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
        aria-label="User menu"
        aria-expanded={open}
      >
        <Avatar name={user?.name || user?.email} size="sm" />
        <span className="hidden sm:block text-sm font-medium text-slate-700 max-w-28 truncate">
          {user?.name || 'Student'}
        </span>
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={close} aria-hidden="true" />
          <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-100 z-20 overflow-hidden">
            {/* Identity */}
            <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
              <Avatar name={user?.name || user?.email} size="sm" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{user?.name || 'Student'}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email}</p>
              </div>
            </div>

            {/* Nav */}
            <MenuItem icon={User} onClick={() => go('/profile')}>Profile</MenuItem>
            <MenuItem icon={Settings} onClick={() => go('/settings')}>Settings</MenuItem>
            <MenuItem icon={Bookmark} onClick={() => go('/bookmarks')}>Bookmarks</MenuItem>
            <MenuItem icon={MessageSquare} onClick={() => go('/feedback')}>Feedback</MenuItem>

            <div className="border-t border-slate-100 my-1" />
            <MenuItem icon={LogOut} onClick={handleLogout} danger>Sign out</MenuItem>
          </div>
        </>
      )}
    </div>
  )
}

function MenuItem({ children, onClick, icon, danger = false }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-left
        ${danger
          ? 'text-red-600 hover:bg-red-50'
          : 'text-slate-700 hover:bg-slate-50'
        }`}
    >
      {icon && <span className="text-base leading-none">{icon}</span>}
      {children}
    </button>
  )
}
