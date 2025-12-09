const DEFAULT_API_BASE_URL = 'http://юность.панксквад.рф/api'
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL

const buildNewsListUrl = (params = {}) => {
  const url = new URL(`${API_BASE_URL}/news`)
  const allowedParams = ['limit', 'include_empty']

  allowedParams.forEach((key) => {
    const value = params[key]
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value)
    }
  })

  return url.toString()
}

const buildNewsItemUrl = (slug) => `${API_BASE_URL}/news/${encodeURIComponent(slug)}`

const handleResponse = async (response) => {
  if (!response.ok) {
    let message = `Ошибка ${response.status}`
    try {
      const data = await response.json()
      message = data?.error || message
    } catch (_) {
      // ignore parsing errors
    }
    const error = new Error(message)
    error.status = response.status
    throw error
  }

  return response.json()
}

export const fetchNewsList = async (params = {}) => {
  const response = await fetch(buildNewsListUrl(params), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return handleResponse(response)
}

export const fetchNewsItem = async (slug) => {
  const response = await fetch(buildNewsItemUrl(slug), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return handleResponse(response)
}
