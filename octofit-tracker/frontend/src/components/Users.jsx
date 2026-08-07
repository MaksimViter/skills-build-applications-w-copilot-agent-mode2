import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeCollectionResponse } from './apiClient'

const endpoint = buildApiUrl('users')

function Users() {
  const [users, setUsers] = useState([])
  const [meta, setMeta] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadUsers() {
      try {
        setLoading(true)
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const payload = await response.json()
        const normalized = normalizeCollectionResponse(payload, 'users')
        if (!cancelled) {
          setUsers(normalized.items)
          setMeta(normalized.meta)
          setError('')
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load users')
          setUsers([])
          setMeta({})
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadUsers()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section>
      <h2>Users</h2>
      <p className="endpoint">{endpoint}</p>
      {loading && <p>Loading users...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && (
        <>
          <ul className="data-list">
            {users.map((user, index) => (
              <li key={user.id ?? index}>
                <strong>{user.name ?? user.username ?? 'Unknown user'}</strong>
                <span> | Team: {user.team ?? '-'}</span>
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

export default Users
