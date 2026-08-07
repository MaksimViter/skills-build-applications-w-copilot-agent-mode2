import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  const navItems = [
    { to: '/users', label: 'Users' },
    { to: '/activities', label: 'Activities' },
    { to: '/teams', label: 'Teams' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/workouts', label: 'Workouts' },
  ]

  return (
    <main className="app-shell">
      <section className="hero-section">
        <p className="eyebrow">OctoFit Tracker</p>
        <h1>Multi-tier Fitness Dashboard</h1>
        <p className="hero-copy">
          React 19 presentation tier connected to the Node.js API on port 8000.
          Use the tabs below to view data from each API component endpoint.
        </p>
      </section>

      <nav className="route-nav" aria-label="API sections">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? 'route-link route-link-active' : 'route-link'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <section className="detail-panel">
        <div className="api-content">
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<Users />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route path="*" element={<Navigate to="/users" replace />} />
          </Routes>
        </div>
        <aside className="next-workout">
          <p className="eyebrow">Environment</p>
          <h3>API Base URL Strategy</h3>
          <p>
            Uses <strong>VITE_CODESPACE_NAME</strong> when set, otherwise falls
            back to localhost.
          </p>
          <ol>
            <li>
              Codespaces:
              {' '}
              https://$CODESPACE_NAME-8000.app.github.dev/api/[component]/
            </li>
            <li>Local fallback: http://localhost:8000/api/[component]/</li>
            <li>Supports array and paginated API payloads.</li>
          </ol>
        </aside>
      </section>
    </main>
  )
}

export default App
