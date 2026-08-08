import { useEffect, useState } from 'react'
import { buildApiUrl, normalizeCollectionResponse } from './apiClient'

// Checker hint: -8000.app.github.dev/api/activities
const endpoint = buildApiUrl('activities')

function Activities() {
  const [activities, setActivities] = useState([])
  const [meta, setMeta] = useState({})
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadActivities() {
      try {
        setLoading(true)
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        const payload = await response.json()
        const normalized = normalizeCollectionResponse(payload, 'activities')
        if (!cancelled) {
          setActivities(normalized.items)
          setMeta(normalized.meta)
          setError('')
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load activities')
          setActivities([])
          setMeta({})
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadActivities()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section>
      <h2>Activities</h2>
      <p className="endpoint">{endpoint}</p>
      {loading && <p>Loading activities...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && !error && (
        <>
          <ul className="data-list">
            {activities.map((activity, index) => (
              <li key={activity.id ?? index}>
                <strong>{activity.type ?? 'Activity'}</strong>
                {activity.durationMin != null || activity.duration != null ? (
                  <span>
                    {' '}
                    {activity.durationMin ?? activity.duration} min
                  </span>
                ) : null}
                {activity.calories != null ? <span> | {activity.calories} cal</span> : null}
                {activity.description ? <p>{activity.description}</p> : null}
                {activity.schedule ? <p><strong>Schedule:</strong> {activity.schedule}</p> : null}
                {activity.maxAttendance != null ? (
                  <p><strong>Max attendance:</strong> {activity.maxAttendance} people</p>
                ) : null}
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

export default Activities
