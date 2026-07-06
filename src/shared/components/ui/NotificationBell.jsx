import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

/**
 * <NotificationBell count={3} notifications={[...]} onMarkAllRead={() => {}} />
 */
export default function NotificationBell({ count = 0, notifications = [], onMarkAllRead }) {
  const [open, setOpen]   = useState(false)
  const navigate          = useNavigate()
  const unread            = Math.min(count, 99)

  const typeIcon = { info: 'ℹ️', quiz: '❓', assignment: '📝', grade: '📊', system: '🔔' }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        aria-label={`Notifications${unread ? ` (${unread} unread)` : ''}`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unread > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 px-1 rounded-full
            bg-red-500 text-white text-[10px] font-bold flex items-center justify-center leading-none">
            {unread}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 z-20 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
              <span className="text-sm font-semibold text-slate-800">Notifications</span>
              {onMarkAllRead && unread > 0 && (
                <button
                  onClick={() => { onMarkAllRead(); setOpen(false) }}
                  className="text-xs text-purple-600 hover:underline font-medium"
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* List */}
            <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
              {notifications.length === 0 ? (
                <p className="text-center text-sm text-slate-400 py-8">You're all caught up 🎉</p>
              ) : (
                notifications.slice(0, 10).map((n) => (
                  <button
                    key={n.id}
                    onClick={() => { n.href && navigate(n.href); setOpen(false) }}
                    className={`w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors
                      ${!n.read ? 'bg-purple-50/50' : ''}`}
                  >
                    <span className="text-xl leading-none mt-0.5 shrink-0">
                      {typeIcon[n.type] || '🔔'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`text-sm leading-snug ${n.read ? 'text-slate-600' : 'text-slate-800 font-medium'}`}>
                        {n.title}
                      </p>
                      {n.body && <p className="text-xs text-slate-400 mt-0.5 truncate">{n.body}</p>}
                      <p className="text-[11px] text-slate-400 mt-1">{n.time}</p>
                    </div>
                    {!n.read && (
                      <span className="shrink-0 w-2 h-2 rounded-full bg-purple-500 mt-1.5" />
                    )}
                  </button>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-100 px-4 py-2.5 text-center">
              <button
                onClick={() => { navigate('/notifications'); setOpen(false) }}
                className="text-xs text-purple-600 font-medium hover:underline"
              >
                See all notifications →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
