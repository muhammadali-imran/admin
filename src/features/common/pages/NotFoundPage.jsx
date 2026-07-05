import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="app-shell">
      <section className="panel full" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '4rem', margin: '0 0 1rem' }}>404</h1>
        <h2>Page not found</h2>
        <p style={{ color: 'var(--slate)', marginBottom: '2rem' }}>
          The page you are looking for does not exist.
        </p>
        <Link to="/dashboard" className="primary-btn">Back to dashboard</Link>
      </section>
    </main>
  )
}
