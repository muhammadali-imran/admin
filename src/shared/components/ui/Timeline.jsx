/**
 * Vertical timeline for course history, lecture progress, etc.
 *
 * <Timeline items={[
 *   { id: 1, title: 'Enrolled', subtitle: 'Jan 5, 2025', type: 'success', icon: '🎓' },
 *   { id: 2, title: 'Quiz 1 completed', subtitle: '72%', type: 'info', icon: '❓' },
 *   { id: 3, title: 'Assignment due', subtitle: 'Feb 1', type: 'warning', icon: '📝' },
 * ]} />
 */
export default function Timeline({ items = [], className = '' }) {
  const typeStyles = {
    success: { dot: 'bg-emerald-500 border-emerald-200', icon: 'text-emerald-700' },
    info:    { dot: 'bg-blue-500    border-blue-200',    icon: 'text-blue-700'    },
    warning: { dot: 'bg-amber-500   border-amber-200',   icon: 'text-amber-700'   },
    danger:  { dot: 'bg-red-500     border-red-200',     icon: 'text-red-700'     },
    default: { dot: 'bg-slate-400   border-slate-200',   icon: 'text-slate-500'   },
  }

  if (!items.length) {
    return (
      <div className={`text-center py-8 text-slate-400 text-sm ${className}`}>
        No timeline events.
      </div>
    )
  }

  return (
    <ol className={`relative ${className}`}>
      {items.map((item, idx) => {
        const styles = typeStyles[item.type] || typeStyles.default
        const isLast = idx === items.length - 1

        return (
          <li key={item.id ?? idx} className="relative flex gap-4 pb-6 last:pb-0">
            {/* Vertical line */}
            {!isLast && (
              <span className="absolute left-3.25 top-7 bottom-0 w-px bg-slate-200" aria-hidden="true" />
            )}

            {/* Dot / icon */}
            <div className={`shrink-0 w-7 h-7 rounded-full border-4 flex items-center justify-center ${styles.dot} z-10`}>
              {item.icon && (
                <span className="text-[10px] leading-none">{item.icon}</span>
              )}
            </div>

            {/* Content */}
            <div className="pt-0.5 min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-800 leading-snug">{item.title}</p>
              {item.subtitle && (
                <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
              )}
              {item.description && (
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.description}</p>
              )}
              {item.action && (
                <button
                  onClick={item.action.onClick}
                  className="mt-2 text-xs text-purple-600 font-medium hover:underline"
                >
                  {item.action.label}
                </button>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
