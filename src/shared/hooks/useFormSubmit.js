// src/hooks/useFormSubmit.js
import { useState, useCallback } from 'react'
import api from '@shared/api/axios'

/**
 * Generic form submit helper with loading / error / success state.
 *
 * const { submit, loading, error, success } = useFormSubmit('/feedback/', 'post')
 * await submit({ message: 'Great course!' })
 */
export function useFormSubmit(url, method = 'post', { onSuccess, onError } = {}) {
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)
  const [success, setSuccess] = useState(false)

  const submit = useCallback(async (data, overrideUrl) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const res = await api[method](overrideUrl || url, data)
      setSuccess(true)
      onSuccess?.(res.data)
      return res.data
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        Object.values(err.response?.data || {}).flat().join(' ') ||
        err.message ||
        'Something went wrong.'
      setError(msg)
      onError?.(msg)
      return null
    } finally {
      setLoading(false)
    }
  }, [url, method, onSuccess, onError])

  const reset = useCallback(() => {
    setError(null)
    setSuccess(false)
  }, [])

  return { submit, loading, error, success, reset }
}
