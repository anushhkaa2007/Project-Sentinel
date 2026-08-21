import './Header.css'

function Header() {
  return (
    <header className="app-header">
      <div className="app-header__inner">
        <div className="app-header__brand">
          <span className="app-header__mark" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M12 3 4.5 6.5v5.2c0 4.4 3.1 8.4 7.5 9.8 4.4-1.4 7.5-5.4 7.5-9.8V6.5L12 3Z" />
              <path d="M9 12.2 11.1 14.4 15.4 9.8" />
            </svg>
          </span>
          <div>
            <div className="app-header__name">Sentinel</div>
            <div className="app-header__tagline">Passive OSINT dashboard</div>
          </div>
        </div>
        <div className="app-header__meta">
          <span className="app-header__pill">Public sources only</span>
        </div>
      </div>
    </header>
  )
}

export default Header
