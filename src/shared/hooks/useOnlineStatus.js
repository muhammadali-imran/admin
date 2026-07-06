// src/hooks/useOnlineStatus.js
import { useState, useEffect } from 'react'

/**
 * Detect whether the browser is online or offline.
 *
 * const { isOnline, wasOffline } = useOnlineStatus()
 *
 * wasOffline: true if the connection was lost at some point this session,
 * useful to trigger a "reconnected" toast.
 */
export function useOnlineStatus() {
  const [isOnline,   setIsOnline]   = useState(() => navigator.onLine)
  const [wasOffline, setWasOffline] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      // wasOffline stays true once the user has gone offline at least once
    }
    const handleOffline = () => {
      setIsOnline(false)
      setWasOffline(true)
    }

    window.addEventListener('online',  handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online',  handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return { isOnline, wasOffline }
}
