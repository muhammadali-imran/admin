// src/hooks/useApi.js
import { useState, useEffect, useRef, useCallback } from 'react'
import api from '@shared/api/axios'

/**
 * useApi — Fetches data on mount and whenever `url` or `params` change.
 *
 * const { data, loading, error, refetch } = useApi('/courses/', { params: { status: 'active' } })
 */
export function useApi(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)
  const prevUrl = useRef(url)
  const prevParamsString = useRef(JSON.stringify(options.params))

  const doFetch = useCallback(async () => {
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    setLoading(true)
    setError(null)

    try {
      const res = await api.get(url, {
        params: options.params,
        signal: abortRef.current.signal,
      })
      setData(res.data)
    } catch (err) {
      if (err.name !== 'CanceledError') {
        setError(err.response?.data?.detail || err.message || 'Something went wrong')
      }
    } finally {
      setLoading(false)
    }
  }, [url, options.params])

  useEffect(() => {
    const currentParamsString = JSON.stringify(options.params)

    if (url !== prevUrl.current || currentParamsString !== prevParamsString.current) {
      prevUrl.current = url
      prevParamsString.current = currentParamsString
      doFetch()
    }

    return () => abortRef.current?.abort()
  }, [url, options.params, doFetch])

  useEffect(() => {
    if (url !== prevUrl.current) {
      setData(null)
      setError(null)
    }
  }, [url])

  return { data, loading, error, refetch: doFetch }
}
