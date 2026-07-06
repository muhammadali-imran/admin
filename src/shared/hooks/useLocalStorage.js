import { useState } from 'react'

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = (value) => {
    try {
      const toStore = typeof value === 'function' ? value(storedValue) : value
      setStoredValue(toStore)
      localStorage.setItem(key, JSON.stringify(toStore))
    } catch (error) {
      console.error('useLocalStorage write error:', error)
    }
  }

  const removeValue = () => {
    try {
      localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error('useLocalStorage remove error:', error)
    }
  }

  return [storedValue, setValue, removeValue]
}
