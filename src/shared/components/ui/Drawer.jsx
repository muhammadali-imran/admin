import { useEffect } from 'react'

/**
 * Slide-out panel from the right (or left) side.
 *
 * <Drawer open={open} onClose={() => setOpen(false)} title="Filters" side="right">
 *   …content…
 * </Drawer>
 */
export default function Drawer({
  open,
  onClose,
  title,
  children,
  side = 'right', // 'right' | 'left'
  width = 'w-80',
  footer,
}) {
  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const slideIn  = side === 'right' ? 'translate-x-0' : '-translate-x-0'
  const slideOut = side === 'right' ? 'translate-x-full' : '-translate-x-full'
  const position = side === 'right' ? 'right-0' : 'left-0'

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`fixed top-0 ${position} h-full z-50 flex flex-col bg-white shadow-2xl
          ${width} transition-transform duration-300 ease-in-out
          ${open ? slideIn : slideOut}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 shrink-0">
          <h2 className="text-base font-semibold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Close panel"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {children}
        </div>

        {/* Optional footer */}
        {footer && (
          <div className="shrink-0 px-5 py-4 border-t border-slate-100 bg-slate-50">
            {footer}
          </div>
        )}
      </div>
    </>
  )
}
