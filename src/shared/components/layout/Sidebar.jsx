import { NavLink } from 'react-router-dom'
import useSidebar from '@shared/hooks/useSidebar'
import useAuth from '@shared/hooks/useAuth'
import Avatar from '@shared/components/ui/Avatar'
import { 
  LayoutDashboard, 
  BookOpen, 
  CreditCard, 
  MessageSquare, 
  User, 
  Settings, 
  LifeBuoy,
  Sparkles,
  Users,
  BarChart3,
  ClipboardCheck,
  Calendar,
  Briefcase
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admissions', label: 'Admissions', icon: ClipboardCheck },
  { to: '/users', label: 'Users', icon: Users },
  { to: '/courses', label: 'Courses', icon: BookOpen },
  { to: '/schedule', label: 'Schedule', icon: Calendar },
  { to: '/finance', label: 'Finance', icon: CreditCard },
  { to: '/hr', label: 'HR / Staff', icon: Briefcase },
  { to: '/announcements', label: 'Announcements', icon: MessageSquare },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
];

const bottomItems = [
  { to: '/profile',  label: 'Profile',  icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/support',  label: 'Support',  icon: LifeBuoy }, 
];

export default function Sidebar() {
  const { open } = useSidebar();
  const { user } = useAuth();

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 bg-slate-900/40 z-20 lg:hidden transition-opacity duration-200 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sidebar container - Now White base layout with clean borders */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-30 flex flex-col bg-white border-r border-slate-100 shadow-sm text-slate-700
          transition-all duration-300 ease-in-out
          ${open ? 'w-64' : 'w-0 lg:w-16 overflow-hidden'}
        `}
      >
        <div className={`flex items-center gap-3 px-4 py-5 border-b border-slate-50 min-h-16 ${!open && 'lg:justify-center lg:px-0'}`}>
          <Sparkles className="w-6 h-6 text-amber-500 fill-amber-400 shrink-0" />
          {open && (
            <span className="font-bold text-lg tracking-tight text-red-900">
              Admin Panel
            </span>
          )}
        </div>

        {/* Main Navigation items */}
        <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 custom-scrollbar">
          {navItems.map(({ to, label, icon: IconComponent }) => (
            <NavLink
              key={to}
              to={to}
              title={label}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-2.5 mx-2 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-red-50 text-red-600 font-semibold' // Red accent background for active item
                  : 'text-slate-500 hover:text-red-600 hover:bg-slate-50/70'
                }
                ${!open && 'lg:justify-center lg:px-0 lg:mx-1'}
              `}
            >
              {({ isActive }) => (
                <>
                  <IconComponent 
                    className={`w-5 h-5 shrink-0 transition-colors ${
                      isActive ? 'text-red-500' : 'text-slate-400 group-hover:text-red-500'
                    }`} 
                  />
                  {open && <span>{label}</span>}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="py-2 border-t border-slate-100 space-y-0.5 bg-slate-50/50">
          {bottomItems.map(({ to, label, icon: IconComponent }) => (
            <NavLink
              key={to}
              to={to}
              title={label}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-2 mx-2 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-red-50 text-red-600 font-semibold'
                  : 'text-slate-500 hover:text-red-600 hover:bg-slate-100/70'
                }
                ${!open && 'lg:justify-center lg:px-0 lg:mx-1'}
              `}
            >
              {({ isActive }) => (
                <>
                  <IconComponent 
                    className={`w-5 h-5 shrink-0 ${
                      isActive ? 'text-red-500' : 'text-slate-400'
                    }`} 
                  />
                  {open && <span>{label}</span>}
                </>
              )}
            </NavLink>
          ))}

          {/* User profile segment */}
          {open && user && (
            <div className="flex items-center gap-3 px-3 py-2.5 mx-2 mt-2 rounded-xl border border-slate-200/60 bg-white shadow-sm">
              <Avatar name={user.name || user.email} size="sm" className="ring-2 ring-amber-400/30" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{user.name || 'Administrator'}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}