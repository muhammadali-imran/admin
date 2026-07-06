// src/api/authService.js
import api from './axios'
// If you want to switch to mock, comment out the import above and uncomment below:
// import { mockLogin, mockRegister, mockGetMe } from '../mock/auth'
// const USE_MOCK = true

// Uncomment for mock:
/*
const login = mockLogin
const register = mockRegister
const getMe = mockGetMe
export { login, register, getMe }
*/

// Real implementation (active)
export async function login(email, password) {
  const { data } = await api.post('/auth/login/', { email, password })
  return data
}

export async function register(payload) {
  const { data } = await api.post('/auth/register/', payload)
  return data
}

export async function getMe() {
  const { data } = await api.get('/auth/me/')
  return data
}