// src/hooks/useNotification.js
import { useState, useCallback } from 'react'
import { useApi } from '@shared/hooks/useApi'
import api from '@shared/api/axios'

/**
 * Fetch and manage the user's notification list.
 *
 * const {
 *   notifications, unreadCount, loading, error,
 *   markAsRead, markAllRead, refetch,
 * } = useNotification()
 */
export function useNotification() {
  const { data, loading, error, refetch } = useApi('/notifications/')
  const [optimistic, setOptimistic] = useState(null)

  const notifications = optimistic ?? data?.results ?? data ?? []
  const unreadCount   = notifications.filter((n) => !n.read).length

  const markAsRead = useCallback(async (id) => {
    // Optimistic update
    setOptimistic((prev) =>
      (prev ?? notifications).map((n) => (n.id === id ? { ...n, read: true } : n))
    )
    try {
      await api.patch(`/notifications/${id}/`, { read: true })
    } catch {
      // rollback
      setOptimistic(null)
    }
  }, [notifications])

  const markAllRead = useCallback(async () => {
    setOptimistic((prev) =>
      (prev ?? notifications).map((n) => ({ ...n, read: true }))
    )
    try {
      await api.post('/notifications/mark-all-read/')
    } catch {
      setOptimistic(null)
    }
  }, [notifications])

  return {
    notifications,
    unreadCount,
    loading,
    error,
    refetch,
    markAsRead,
    markAllRead,
  }
}
