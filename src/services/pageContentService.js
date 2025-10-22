const DEFAULT_API_BASE_URL = 'http://localhost:5000/api'

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL ?? DEFAULT_API_BASE_URL

const buildUrl = (path) => {
  const normalized = (path || '').replace(/^\/+/, '')
  const encoded = normalized
    .split('/')
    .map(segment => encodeURIComponent(segment))
    .join('/')
  return `${API_BASE_URL}/pages/${encoded}`
}

async function handleResponse(response) {
  if (!response.ok) {
    let message = `Ошибка ${response.status}`
    try {
      const data = await response.json()
      message = data?.error || message
    } catch (_) {
      // ignore json parsing errors
    }
    const error = new Error(message)
    error.status = response.status
    throw error
  }
  return response.json()
}

export async function fetchPageContent(path) {
  const url = buildUrl(path)
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return handleResponse(response)
}

export async function savePageContent(path, payload) {
  const url = buildUrl(path)
  const token = localStorage.getItem('token') || ''

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(payload)
  })

  return handleResponse(response)
}
