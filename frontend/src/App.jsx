import { useState } from 'react'
import Header from './components/Header'
import InvestigationForm from './components/InvestigationForm'
import EmptyDashboard from './components/EmptyDashboard'
import './App.css'

function App() {
  const [lastAttemptedDomain, setLastAttemptedDomain] = useState('')

  function handleInvestigate(domain) {
    setLastAttemptedDomain(domain)
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <InvestigationForm onInvestigate={handleInvestigate} />
        <EmptyDashboard lastAttemptedDomain={lastAttemptedDomain} />
      </main>
    </div>
  )
}

export default App
