/**
 * <TabBar
 *   tabs={[
 *     { id: 'overview',   label: 'Overview',   icon: '📋' },
 *     { id: 'lectures',   label: 'Lectures',   icon: '🎬', badge: 12 },
 *     { id: 'quizzes',    label: 'Quizzes',    icon: '❓' },
 *     { id: 'resources',  label: 'Resources',  icon: '📁' },
 *   ]}
 *   active="overview"
 *   onChange={(id) => setTab(id)}
 * />
 */
export default function TabBar({ tabs = [], active, onChange, className = '' }) {
  return (
    <div className={`border-b border-slate-200 ${className}`}>
      <nav className="-mb-px flex gap-1 overflow-x-auto scrollbar-none" role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.id === active
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange?.(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
                ${isActive
                  ? 'border-purple-600 text-purple-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
            >
              {tab.icon && <span className="text-base leading-none">{tab.icon}</span>}
              {tab.label}
              {tab.badge != null && (
                <span
                  className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold
                    ${isActive
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-slate-100 text-slate-500'
                    }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
