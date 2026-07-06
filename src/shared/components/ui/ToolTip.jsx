import { useState, useRef, useEffect } from 'react'

/**
 * <Tooltip content="This action cannot be undone" placement="top">
 *   <button>Delete</button>
 * </Tooltip>
 */
export default function Tooltip({
  content,
  children,
  placement = 'top', // 'top' | 'bottom' | 'left' | 'right'
  delay = 300,
  className = '',
}) {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef(null)

  const show = () => {
    timerRef.current = setTimeout(() => setVisible(true), delay)
  }
  const hide = () => {
    clearTimeout(timerRef.current)
    setVisible(false)
  }

  useEffect(() => () => clearTimeout(timerRef.current), [])

  const positions = {
    top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full  left-1/2 -translate-x-1/2 mt-2',
    left:   'right-full top-1/2 -translate-y-1/2 mr-2',
    right:  'left-full  top-1/2 -translate-y-1/2 ml-2',
  }
  const pos = positions[placement] || positions.top

  return (
    <span className="relative inline-flex" onMouseEnter={show} onMouseLeave={hide}>
      {children}
      {visible && content && (
        <span
          role="tooltip"
          className={`absolute z-50 ${pos} px-2.5 py-1.5 rounded-lg bg-slate-800 text-white text-xs
            font-medium whitespace-nowrap shadow-lg pointer-events-none ${className}`}
        >
          {content}
        </span>
      )}
    </span>
  )
}
