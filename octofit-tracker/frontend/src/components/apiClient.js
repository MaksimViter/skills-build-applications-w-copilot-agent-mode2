const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : inferFallbackOrigin()

export function buildApiUrl(componentName) {
  const normalized = componentName.replace(/^\/+|\/+$/g, '')
  return `${apiBaseOrigin}/api/${normalized}/`
}

export function normalizeCollectionResponse(payload, key) {
  if (Array.isArray(payload)) {
    return { items: payload, meta: {} }
  }

  if (!payload || typeof payload !== 'object') {
    return { items: [], meta: {} }
  }

  if (Array.isArray(payload[key])) {
    return { items: payload[key], meta: extractMeta(payload) }
  }

  for (const candidate of ['results', 'items', 'data']) {
    if (Array.isArray(payload[candidate])) {
      return { items: payload[candidate], meta: extractMeta(payload) }
    }
  }

  return { items: [], meta: extractMeta(payload) }
}

function extractMeta(payload) {
  const meta = {}
  for (const key of ['count', 'page', 'pageSize', 'totalPages', 'next', 'previous']) {
    if (payload[key] !== undefined) {
      meta[key] = payload[key]
    }
  }
  return meta
}

function inferFallbackOrigin() {
  const hostname = globalThis?.location?.hostname

  if (hostname?.endsWith('.app.github.dev')) {
    return `https://${hostname.replace('-5173.app.github.dev', '-8000.app.github.dev')}`
  }

  return 'http://localhost:8000'
}
