import { Link } from 'react-router-dom'

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-900 to-indigo-900 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-8 text-white">
        <span className="text-3xl">⚡</span>
        <span className="text-2xl font-bold tracking-tight">Learner</span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        {children}
      </div>

      {/* Footer links */}
      <p className="mt-6 text-white/50 text-xs">
        © {new Date().getFullYear()} Learner ·{' '}
        <Link to="/privacy" className="hover:text-white/80 transition-colors">Privacy</Link>
        {' · '}
        <Link to="/terms" className="hover:text-white/80 transition-colors">Terms</Link>
      </p>
    </div>
  )
}
