import { useState } from 'react'
import './InvestigationForm.css'

function InvestigationForm({ onInvestigate }) {
  const [domain, setDomain] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const value = domain.trim()

    if (!value) {
      setError('Enter a domain to investigate, for example example.com.')
      return
    }

    setError('')
    onInvestigate(value)
  }

  return (
    <section className="investigation-form" aria-labelledby="investigate-heading">
      <div className="investigation-form__intro">
        <p className="investigation-form__kicker">New investigation</p>
        <h1 id="investigate-heading" className="investigation-form__title">
          Investigate a public domain
        </h1>
        <p className="investigation-form__copy">
          Enter a domain name. Sentinel will collect publicly available technical
          information and present it as a structured investigation.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="investigation-form__row">
          <div className="investigation-form__field">
            <label className="investigation-form__label" htmlFor="domain">
              Target domain
            </label>
            <input
              id="domain"
              className="investigation-form__input"
              type="text"
              name="domain"
              autoComplete="off"
              spellCheck="false"
              placeholder="example.com"
              value={domain}
              onChange={(event) => setDomain(event.target.value)}
            />
          </div>
          <button className="investigation-form__submit" type="submit">
            Investigate
          </button>
        </div>
        {error ? (
          <p className="investigation-form__error" role="alert">
            {error}
          </p>
        ) : null}
      </form>
    </section>
  )
}

export default InvestigationForm
