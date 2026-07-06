import { useState, useEffect, useRef } from 'react'

/**
 * useTimer — countdown timer in seconds.
 * @param {number} seconds  initial seconds
 * @param {Function} onEnd  called when timer reaches 0
 */
export function useTimer(seconds, onEnd) {
  const [remaining, setRemaining] = useState(seconds)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          setRunning(false)
          onEnd?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running, onEnd])

  const start = () => setRunning(true)
  const pause = () => setRunning(false)
  const reset = (s = seconds) => { setRunning(false); setRemaining(s) }

  const minutes = Math.floor(remaining / 60)
  const secs = remaining % 60
  const formatted = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`

  return { remaining, formatted, running, start, pause, reset }
}
