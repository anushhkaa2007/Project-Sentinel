import './EmptyDashboard.css'

const UPCOMING_PANELS = [
  { label: 'Overview', title: 'Target overview', hint: 'Domain identity and scan context' },
  { label: 'DNS', title: 'DNS records', hint: 'Public name and mail records' },
  { label: 'Network', title: 'IP and hosting', hint: 'Addresses and infrastructure' },
  { label: 'TLS', title: 'Certificates', hint: 'Public TLS/SSL details' },
  { label: 'Stack', title: 'Technologies', hint: 'Detected public technologies' },
  { label: 'Graph', title: 'Relationships', hint: 'Links between discovered entities' },
]

function EmptyDashboard({ lastAttemptedDomain }) {
  return (
    <section className="empty-dashboard" aria-labelledby="empty-heading">
      <div className="empty-dashboard__panel">
        <svg
          className="empty-dashboard__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20 16.5 16.5" />
        </svg>
        <h2 id="empty-heading" className="empty-dashboard__title">
          No investigation has been started
        </h2>
        <p className="empty-dashboard__copy">
          {lastAttemptedDomain
            ? `“${lastAttemptedDomain}” is ready as a target, but collection is not connected yet. Enter a domain and use Investigate once the backend is available.`
            : 'Use the field above to enter a domain, then click Investigate. Findings will appear here as structured intelligence cards, tables, and a relationship graph.'}
        </p>
      </div>

      <div className="empty-dashboard__grid" aria-hidden="true">
        {UPCOMING_PANELS.map((panel) => (
          <article className="empty-dashboard__card" key={panel.label}>
            <div className="empty-dashboard__card-label">{panel.label}</div>
            <div className="empty-dashboard__card-title">{panel.title}</div>
            <p className="empty-dashboard__card-hint">{panel.hint}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default EmptyDashboard
