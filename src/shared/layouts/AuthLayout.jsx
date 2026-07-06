import { Link } from 'react-router-dom'
import NavBar from '../components/ui/NavBar'
import Logo from '../components/ui/logo'

export default function AuthLayout({ children }) {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 40%, #991b1b 100%)' }}
    >
      <NavBar
        logo={<Logo />}
        links={[
          { to: '/', label: 'Home' },
          { to: '/login', label: 'Login' },
        ]}
        actionButton={
          <Link
            to="/login"
            className="nav-item inline-flex items-center px-5 py-2.5 text-sm font-bold rounded-xl text-white shadow-lg font-cantarell"
            style={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', boxShadow: '0 4px 18px rgba(220,38,38,0.40)' }}
          >
            Admin Panel
          </Link>
        }
      />

      <div className="flex-1 flex flex-col items-center justify-center p-4 pt-24">
        {/* Admin branding */}
        <Link to="/" className="flex items-center gap-2 mb-8 text-white">
          <span className="text-3xl">⚡</span>
          <div>
            <span className="text-2xl font-bold tracking-tight block">Admin</span>
            <p className="text-[10px] text-white/40 uppercase tracking-widest -mt-1">Control Center</p>
          </div>
        </Link>

        {/* Auth card */}
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-red-100/30">
          {children}
        </div>

        {/* Footer links */}
        <p className="mt-6 text-white/50 text-xs">
          © {new Date().getFullYear()} Admin ·{' '}
          <Link to="/privacy" className="hover:text-white/80 transition-colors">Privacy</Link>
          {' · '}
          <Link to="/terms" className="hover:text-white/80 transition-colors">Terms</Link>
        </p>
      </div>
    </div>
  )
}
