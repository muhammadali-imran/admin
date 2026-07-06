import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '@shared/hooks/useAuth'

const publicLinks = [
  { to: '/about',   label: 'About'   },
  { to: '/support', label: 'Support' },
]

/**
 * Public-facing top navigation bar (used on landing, about, support, etc.).
 * Authenticated users see a "Go to Dashboard" CTA instead of sign-in/register.
 *
 * <NavBar />
 */
export default function NavBar() {
  const { user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl leading-none">⚡</span>
          <span className="text-lg font-bold text-indigo-950 tracking-tight">Learner</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {publicLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive ? 'text-purple-700 bg-purple-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-xl hover:bg-purple-700 transition-colors"
            >
              Dashboard →
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-purple-600 text-white text-sm font-semibold rounded-xl hover:bg-purple-700 transition-colors"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-1 border-t border-slate-100">
          {publicLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 text-sm text-slate-700 rounded-xl hover:bg-slate-100"
            >
              {label}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            {user ? (
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-xl text-center">
                Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)}
                  className="px-4 py-2.5 text-sm text-center text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50">
                  Sign in
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)}
                  className="px-4 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-xl text-center">
                  Get started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
