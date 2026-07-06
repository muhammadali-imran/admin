import { useState } from 'react'

/**
 * <Announcements items={[
 *   { id: 1, title: 'Exam postponed', body: '…', date: '2025-06-01', type: 'warning', author: 'Admin' },
 * ]} />
 */
export default function Announcements({ items = [], loading = false, className = '' }) {
  const [expanded, setExpanded] = useState(null)

  const typeStyles = {
    info:    { bar: 'bg-blue-500',    bg: 'bg-blue-50',    icon: 'ℹ️' },
    warning: { bar: 'bg-amber-500',   bg: 'bg-amber-50',   icon: '⚠️' },
    success: { bar: 'bg-emerald-500', bg: 'bg-emerald-50', icon: '✅' },
    danger:  { bar: 'bg-red-500',     bg: 'bg-red-50',     icon: '🚨' },
  }

  if (loading) {
    return (
      <div className={`space-y-3 ${className}`}>
        {[1, 2].map((i) => (
          <div key={i} className="animate-pulse h-16 bg-slate-100 rounded-xl" />
        ))}
      </div>
    )
  }

  if (!items.length) {
    return (
      <div className={`text-center py-8 text-slate-400 text-sm ${className}`}>
        No announcements at this time.
      </div>
    )
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => {
        const style = typeStyles[item.type] || typeStyles.info
        const isOpen = expanded === item.id

        return (
          <div
            key={item.id}
            className={`rounded-xl border border-slate-100 shadow-sm overflow-hidden ${style.bg}`}
          >
            <button
              className="w-full flex items-start gap-3 px-4 py-3 text-left"
              onClick={() => setExpanded(isOpen ? null : item.id)}
            >
              {/* Colored left bar */}
              <span className={`shrink-0 w-1 self-stretch rounded-full ${style.bar}`} />
              <span className="text-lg leading-none mt-0.5">{style.icon}</span>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-800 leading-snug">{item.title}</p>
                  <span className="shrink-0 text-xs text-slate-400">{item.date}</span>
                </div>
                {item.author && (
                  <p className="text-xs text-slate-500 mt-0.5">{item.author}</p>
                )}
              </div>
              <span className="shrink-0 text-slate-400 text-xs mt-0.5">{isOpen ? '▲' : '▼'}</span>
            </button>

            {isOpen && item.body && (
              <div className="px-4 pb-4 pl-10 text-sm text-slate-700 leading-relaxed border-t border-black/5">
                <div className="pt-3">{item.body}</div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
