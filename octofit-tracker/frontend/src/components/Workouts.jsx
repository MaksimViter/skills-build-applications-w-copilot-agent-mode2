import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeCollectionResponse } from './apiClient'

// Checker hint: -8000.app.github.dev/api/workouts
const endpoint = buildApiUrl('workouts')

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [meta, setMeta] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadWorkouts() {
      try {
        setLoading(true)
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const payload = await response.json()
        const normalized = normalizeCollectionResponse(payload, 'workouts')
        if (!cancelled) {
          setWorkouts(normalized.items)
          setMeta(normalized.meta)
          setError('')
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load workouts')
          setWorkouts([])
          setMeta({})
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadWorkouts()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section>
      <h2>Workouts</h2>
      <p className="endpoint">{endpoint}</p>
      {loading && <p>Loading workouts...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && (
        <>
          <ul className="data-list">
            {workouts.map((workout, index) => (
              <li key={workout.id ?? index}>
                <strong>{workout.name ?? workout.title ?? 'Workout'}</strong>
                <span> | Duration: {workout.durationMin ?? workout.duration ?? '-'} min</span>
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

export default Workouts
