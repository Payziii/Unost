import { defaultNavigationSections, defaultMenuItems, getDefaultNavigationConfig } from '@/config/navigation-defaults.js'

export const NAVIGATION_STORAGE_KEY = 'unost.header.navigation'
export const NAVIGATION_UPDATE_EVENT = 'header-navigation-updated'

const defaultSectionLabelMap = Object.fromEntries(
  defaultNavigationSections.map(({ id, label }) => [id, label])
)

const deepClone = (value) => {
  try {
    return JSON.parse(JSON.stringify(value))
  } catch (_) {
    if (Array.isArray(value)) {
      return value.map((item) => deepClone(item))
    }
    if (value && typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value).map(([key, entry]) => [key, deepClone(entry)])
      )
    }
    return value
  }
}

const isExternalRoute = (value) => /^https?:\/\//i.test(value || '')

export const normalizeRoutePath = (value) => {
  if (typeof value !== 'string') {
    return ''
  }

  const trimmed = value.trim()

  if (!trimmed) {
    return ''
  }

  if (isExternalRoute(trimmed)) {
    return trimmed
  }

  const withLeadingSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  const collapsed = withLeadingSlash.replace(/\s+/g, '-')
  const sanitized = collapsed.replace(/[^a-z0-9а-яё/_-]+/gi, '-')
  const withoutTrailingSlash = sanitized.length > 1 && sanitized.endsWith('/')
    ? sanitized.slice(0, -1)
    : sanitized
  return withoutTrailingSlash.replace(/-+/g, '-')
}

const sanitizeNavigationItem = (item, index, parentId) => {
  if (!item || typeof item !== 'object') {
    return null
  }

  const text = typeof item.text === 'string' ? item.text.trim() : ''
  const route = typeof item.route === 'string' ? normalizeRoutePath(item.route) : ''
  const subitemsSource = Array.isArray(item.subitems) ? item.subitems : []

  const subitems = subitemsSource
    .map((subitem, subIndex) => sanitizeNavigationItem(subitem, subIndex, `${parentId}-${index + 1}`))
    .filter(Boolean)

  if (!text) {
    if (subitems.length > 0) {
      return {
        text: `Без названия ${index + 1}`,
        route,
        subitems
      }
    }
    return null
  }

  if (!route && subitems.length === 0) {
    return null
  }

  return {
    text,
    route,
    subitems
  }
}

const sanitizeNavigationSection = (section, index) => {
  const fallbackId = `section-${index + 1}`
  const id = typeof section?.id === 'string' && section.id.trim()
    ? section.id.trim()
    : fallbackId

  const label = typeof section?.label === 'string' && section.label.trim()
    ? section.label.trim()
    : defaultSectionLabelMap[id] || `Раздел ${index + 1}`

  const route = typeof section?.route === 'string'
    ? normalizeRoutePath(section.route)
    : ''

  const itemsSource = Array.isArray(section?.items)
    ? section.items
    : (defaultMenuItems[id] || [])

  const items = itemsSource
    .map((item, itemIndex) => sanitizeNavigationItem(item, itemIndex, id))
    .filter(Boolean)

  return {
    id,
    label,
    route,
    items
  }
}

export const sanitizeNavigationConfig = (config) => {
  if (!Array.isArray(config)) {
    return getDefaultNavigationConfig()
  }

  const sanitized = config
    .map((section, index) => sanitizeNavigationSection(section, index))
    .filter((section) => Array.isArray(section.items) && section.items.length > 0)

  if (sanitized.length > 0) {
    return sanitized
  }

  return getDefaultNavigationConfig()
}

export const navigationConfigToMap = (config) => {
  const sanitized = sanitizeNavigationConfig(config)

  return sanitized.reduce((acc, section) => {
    acc[section.id] = deepClone(section.items)
    return acc
  }, {})
}

export const mergeWithDefaultNavigation = (config) => {
  const sanitized = sanitizeNavigationConfig(config)
  const sanitizedIds = new Set(sanitized.map((section) => section.id))

  const missingDefaults = defaultNavigationSections
    .filter((section) => !sanitizedIds.has(section.id))
    .map((section) => ({
      ...section,
      items: deepClone(defaultMenuItems[section.id] || [])
    }))

  return [...sanitized, ...missingDefaults]
}

export const broadcastNavigationUpdate = (config) => {
  if (typeof window === 'undefined' || typeof window.dispatchEvent !== 'function') {
    return
  }

  const detail = sanitizeNavigationConfig(config)
  window.dispatchEvent(new CustomEvent(NAVIGATION_UPDATE_EVENT, { detail }))
}

export const readNavigationFromStorage = () => {
  if (typeof localStorage === 'undefined') {
    return null
  }

  try {
    const raw = localStorage.getItem(NAVIGATION_STORAGE_KEY)
    if (!raw) {
      return null
    }

    const parsed = JSON.parse(raw)
    if (JSON.stringify(parsed).includes('\uFFFD')) {
      localStorage.removeItem(NAVIGATION_STORAGE_KEY)
      return null
    }
    return sanitizeNavigationConfig(parsed)
  } catch (_) {
    return null
  }
}

export const writeNavigationToStorage = (config) => {
  if (typeof localStorage === 'undefined') {
    return false
  }

  try {
    const sanitized = sanitizeNavigationConfig(config)
    localStorage.setItem(NAVIGATION_STORAGE_KEY, JSON.stringify(sanitized))
    return true
  } catch (_) {
    return false
  }
}

export const resetNavigationStorage = () => {
  if (typeof localStorage === 'undefined') {
    return
  }

  try {
    localStorage.removeItem(NAVIGATION_STORAGE_KEY)
  } catch (_) {
    // ignore storage errors
  }
}

export const getDefaultNavigationSections = () => deepClone(defaultNavigationSections)

export const getDefaultNavigationItems = () => deepClone(defaultMenuItems)

