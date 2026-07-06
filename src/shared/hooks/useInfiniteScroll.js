// src/hooks/useInfiniteScroll.js
import { useState, useEffect, useRef, useCallback } from 'react'
import api from '@shared/api/axios'

/**
 * Infinite-scroll list fetcher (DRF-compatible: expects { results, next }).
 *
 * const { items, loading, hasMore, sentinelRef, reset } = useInfiniteScroll('/courses/')
 */
export function useInfiniteScroll(url, params = {}, pageSize = 10) {
  const [items,   setItems]   = useState([])
  const [page,    setPage]    = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)
  const sentinelRef = useRef(null)

  const fetchPage = useCallback(async (pageNum) => {
    setLoading(true)
    setError(null)
    try {
      const res = await api.get(url, {
        params: { ...params, page: pageNum, page_size: pageSize },
      })
      const data = res.data
      const results = data.results ?? data
      setItems((prev) => pageNum === 1 ? results : [...prev, ...results])
      setHasMore(Boolean(data.next))
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, pageSize, JSON.stringify(params)])

  // Initial load + re-load when url/params change
  useEffect(() => {
    setItems([])
    setPage(1)
    setHasMore(true)
    fetchPage(1)
  }, [fetchPage])

  // Intersection observer
  useEffect(() => {
    if (!sentinelRef.current || !hasMore || loading) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((p) => {
            const next = p + 1
            fetchPage(next)
            return next
          })
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [hasMore, loading, fetchPage])

  const reset = useCallback(() => {
    setItems([])
    setPage(1)
    setHasMore(true)
    fetchPage(1)
  }, [fetchPage])

  return { items, loading, error, hasMore, sentinelRef, reset, page }
}
