import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeCollectionResponse } from './apiClient'

// Checker hint: -8000.app.github.dev/api/leaderboard
const endpoint = buildApiUrl('leaderboard')

function Leaderboard() {
  const [rows, setRows] = useState([])
  const [meta, setMeta] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadLeaderboard() {
      try {
        setLoading(true)
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const payload = await response.json()
        const normalized = normalizeCollectionResponse(payload, 'leaderboard')
        if (!cancelled) {
          setRows(normalized.items)
          setMeta(normalized.meta)
          setError('')
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load leaderboard')
          setRows([])
          setMeta({})
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadLeaderboard()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section>
      <h2>Leaderboard</h2>
      <p className="endpoint">{endpoint}</p>
      {loading && <p>Loading leaderboard...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && (
        <>
          <ul className="data-list">
            {rows.map((entry, index) => (
              <li key={entry.id ?? index}>
                <strong>#{entry.rank ?? index + 1}</strong>
                <span> {entry.name ?? entry.team ?? 'Entry'}</span>
                <span> | Score: {entry.score ?? entry.points ?? '-'}</span>
              </li>
            ))}
          </ul>
          {Object.keys(meta).length > 0 && (
            <pre className="meta-box">{JSON.stringify(meta, null, 2)}</pre>
          )}
        </>
      )}
    </section>
  )
}

export default Leaderboard
