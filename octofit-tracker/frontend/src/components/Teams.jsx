import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeCollectionResponse } from './apiClient'

// Checker hint: -8000.app.github.dev/api/teams
const endpoint = buildApiUrl('teams')

function Teams() {
  const [teams, setTeams] = useState([])
  const [meta, setMeta] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadTeams() {
      try {
        setLoading(true)
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const payload = await response.json()
        const normalized = normalizeCollectionResponse(payload, 'teams')
        if (!cancelled) {
          setTeams(normalized.items)
          setMeta(normalized.meta)
          setError('')
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load teams')
          setTeams([])
          setMeta({})
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadTeams()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section>
      <h2>Teams</h2>
      <p className="endpoint">{endpoint}</p>
      {loading && <p>Loading teams...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && (
        <>
          <ul className="data-list">
            {teams.map((team, index) => (
              <li key={team.id ?? index}>
                <strong>{team.name ?? 'Team'}</strong>
                <span> | Members: {team.memberCount ?? team.members?.length ?? '-'}</span>
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

export default Teams
