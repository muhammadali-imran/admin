function App() {
  const stats = [
    { label: 'Active learners', value: '4,820', accent: 'sky' },
    { label: 'Pending approvals', value: '18', accent: 'gold' },
    { label: 'Revenue this month', value: '$28.4K', accent: 'navy' },
  ]

  const actions = [
    'Review new courses',
    'Approve instructor requests',
    'Publish announcements',
    'Audit fee payments',
  ]

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <p className="eyebrow">Admin control center</p>
          <h1>Run the learning platform with clarity and momentum.</h1>
          <p>
            Keep growth, learning quality, and operations in sync from one polished command center.
          </p>
          <div className="hero-actions">
            <a href="#actions" className="primary-btn">Open dashboard</a>
            <a href="#insights" className="secondary-btn">View insights</a>
          </div>
        </div>

        <div className="hero-panel">
          <div className="hero-panel-top">
            <span className="pill">Live operations</span>
            <span className="status-dot">●</span>
          </div>
          <div className="hero-panel-list">
            <div>
              <strong>12</strong>
              <span>New enrollments</span>
            </div>
            <div>
              <strong>96%</strong>
              <span>Course completion</span>
            </div>
            <div>
              <strong>7</strong>
              <span>Urgent tasks</span>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-grid" id="insights">
        {stats.map((item) => (
          <article key={item.label} className={`stat-card ${item.accent}`}>
            <p>{item.label}</p>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-header">
            <h2>What needs attention</h2>
            <span className="pill">Today</span>
          </div>
          <ul className="stack-list">
            <li><span className="dot sky" /> 3 instructor onboarding requests</li>
            <li><span className="dot gold" /> 2 content reviews are overdue</li>
            <li><span className="dot navy" /> 5 fee reminders need follow-up</li>
          </ul>
        </article>

        <article className="panel" id="actions">
          <div className="panel-header">
            <h2>Quick actions</h2>
            <span className="pill muted">Fast lanes</span>
          </div>
          <div className="action-list">
            {actions.map((action) => (
              <button key={action} type="button" className="action-chip">
                {action}
              </button>
            ))}
          </div>
        </article>
      </section>

      <section className="content-grid">
        <article className="panel full">
          <div className="panel-header">
            <h2>System health</h2>
            <span className="pill muted">Stable</span>
          </div>
          <div className="health-row">
            <div>
              <strong>99.2%</strong>
              <span>Platform uptime</span>
            </div>
            <div>
              <strong>4.8/5</strong>
              <span>Instructor satisfaction</span>
            </div>
            <div>
              <strong>+14%</strong>
              <span>Weekly engagement</span>
            </div>
          </div>
        </article>
      </section>
    </main>
  )
}

export default App
