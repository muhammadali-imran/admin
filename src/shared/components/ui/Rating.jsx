import { useState } from 'react'

/**
 * <Rating value={4} onChange={(v) => setRating(v)} max={5} />
 * <Rating value={3.5} readOnly />
 */
export default function Rating({
  value = 0,
  onChange,
  max = 5,
  readOnly = false,
  size = 'md',
  showLabel = false,
  className = '',
}) {
  const [hovered, setHovered] = useState(null)

  const sizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl' }
  const sizeClass = sizes[size] || sizes.md

  const display = hovered ?? value

  const getStarType = (star) => {
    if (display >= star)       return 'full'
    if (display >= star - 0.5) return 'half'
    return 'empty'
  }

  const starChar = (type) => {
    if (type === 'full') return '★'
    if (type === 'half') return '⯨'
    return '☆'
  }

  const starColor = (type) =>
    type === 'empty' ? 'text-slate-300' : 'text-amber-400'

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div
        className={`flex ${readOnly ? '' : 'cursor-pointer'}`}
        onMouseLeave={() => !readOnly && setHovered(null)}
      >
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => {
          const type = getStarType(star)
          return (
            <button
              key={star}
              type="button"
              disabled={readOnly}
              onClick={() => !readOnly && onChange?.(star)}
              onMouseEnter={() => !readOnly && setHovered(star)}
              className={`${sizeClass} ${starColor(type)} leading-none transition-colors
                ${readOnly ? 'cursor-default' : 'hover:text-amber-500'}`}
              aria-label={`Rate ${star} out of ${max}`}
            >
              {starChar(type)}
            </button>
          )
        })}
      </div>
      {showLabel && (
        <span className="text-sm text-slate-600 ml-1">
          {value.toFixed(1)} / {max}
        </span>
      )}
    </div>
  )
}
