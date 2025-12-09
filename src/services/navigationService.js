import {
  readNavigationFromStorage,
  writeNavigationToStorage,
  sanitizeNavigationConfig,
  getDefaultNavigationSections,
  getDefaultNavigationItems,
  broadcastNavigationUpdate
} from '@/utils/navigation'
import { getDefaultNavigationConfig } from '@/config/navigation-defaults.js'

const DEFAULT_API_BASE_URL = 'http://юность.панксквад.рф/api'
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL
const NAVIGATION_ENDPOINT = `${API_BASE_URL}/navigation/header`

const handleResponse = async (response) => {
  if (!response.ok) {
    let message = `Ошибка ${response.status}`
    try {
      const data = await response.json()
      message = data?.error || message
    } catch (_) {
      // ignore parse errors
    }
    const error = new Error(message)
    error.status = response.status
    throw error
  }

  return response.json()
}

const extractNavigationPayload = (payload) => {
  if (!payload) {
    return null
  }

  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.navigation)) {
    return payload.navigation
  }

  return null
}

export const fetchHeaderNavigation = async (options = {}) => {
  const { force = false } = options

  if (!force) {
    const cached = readNavigationFromStorage()
    if (cached) {
      return cached
    }
  }

  try {
    const response = await fetch(NAVIGATION_ENDPOINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await handleResponse(response)
    const navigation = sanitizeNavigationConfig(extractNavigationPayload(data) ?? data)
    writeNavigationToStorage(navigation)
    return navigation
  } catch (error) {
    console.warn('Не удалось получить конфигурацию меню, используются кэшированные/дефолтные данные', error)
    const cached = readNavigationFromStorage()
    if (cached) {
      return cached
    }
    const defaults = getDefaultNavigationConfig()
    writeNavigationToStorage(defaults)
    return defaults
  }
}

export const saveHeaderNavigation = async (config) => {
  const sanitized = sanitizeNavigationConfig(config)
  const token = localStorage.getItem('token') || ''

  const payload = {
    navigation: sanitized
  }

  try {
    const response = await fetch(NAVIGATION_ENDPOINT, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(payload)
    })

    const data = await handleResponse(response)
    const savedConfig = sanitizeNavigationConfig(extractNavigationPayload(data) ?? sanitized)
    writeNavigationToStorage(savedConfig)
    broadcastNavigationUpdate(savedConfig)
    return {
      config: savedConfig,
      persisted: true
    }
  } catch (error) {
    console.warn('Сохранение меню на сервере завершилось ошибкой — данные будут сохранены локально', error)
    writeNavigationToStorage(sanitized)
    broadcastNavigationUpdate(sanitized)
    return {
      config: sanitized,
      persisted: false,
      error
    }
  }
}

export const resetHeaderNavigation = () => {
  writeNavigationToStorage(getDefaultNavigationConfig())
  broadcastNavigationUpdate(getDefaultNavigationConfig())
}

export const getNavigationDefaults = () => ({
  sections: getDefaultNavigationSections(),
  items: getDefaultNavigationItems()
})

