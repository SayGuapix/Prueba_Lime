import { useEffect, useState } from 'react'
import { LabTestPanel } from './components/LabTestPanel'
import { OrderPanel } from './components/OrderPanel'
import { PatientPanel } from './components/PatientPanel'
import { ResultPanel } from './components/ResultPanel'
import { AuroraBackground } from './components/ui/aurora-background'
import { api, getHealth } from './services/http'
import type { LabOrder, LabResult, LabTest, Patient } from './types/api'

type View = 'patients' | 'tests' | 'orders' | 'results'

const views: Array<{ key: View; label: string; short: string }> = [
  { key: 'patients', label: 'Pacientes', short: 'PA' },
  { key: 'tests', label: 'Pruebas clínicas', short: 'PC' },
  { key: 'orders', label: 'Órdenes', short: 'OR' },
  { key: 'results', label: 'Resultados', short: 'RE' },
]

function App() {
  const [activeView, setActiveView] = useState<View>('patients')
  const [patients, setPatients] = useState<Patient[]>([])
  const [tests, setTests] = useState<LabTest[]>([])
  const [orders, setOrders] = useState<LabOrder[]>([])
  const [results, setResults] = useState<LabResult[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [apiOnline, setApiOnline] = useState(false)

  async function loadData() {
    setLoading(true)
    setError(null)
    try {
      const [patientData, testData, orderData, resultData, health] = await Promise.all([
        api.patients.list(), api.tests.list(), api.orders.list(), api.results.list(), getHealth(),
      ])
      setPatients(patientData); setTests(testData); setOrders(orderData); setResults(resultData); setApiOnline(health.status === 'ok')
    } catch (requestError) {
      setApiOnline(false)
      setError(requestError instanceof Error ? requestError.message : 'No se pudo cargar la información.')
    } finally { setLoading(false) }
  }

  useEffect(() => { void loadData() }, [])

  const renderPanel = () => {
    if (activeView === 'patients') return <PatientPanel patients={patients} onChanged={loadData} />
    if (activeView === 'tests') return <LabTestPanel tests={tests} onChanged={loadData} />
    if (activeView === 'orders') return <OrderPanel orders={orders} patients={patients} tests={tests} onChanged={loadData} />
    return <ResultPanel results={results} orders={orders} onChanged={loadData} />
  }

  return <AuroraBackground className="app-shell">
    <header className="topbar"><div className="brand"><span className="brand-mark">LI</span><div><p>Lime</p><span>Gestión de laboratorio</span></div></div><div className={`connection-status ${apiOnline ? 'is-online' : ''}`}><span />{apiOnline ? 'API conectada' : 'API sin conexión'}</div></header>
    <div className="page-layout">
      <aside className="sidebar"><div className="sidebar-intro"><p className="section-eyebrow">Panel de control</p><h1>Operaciones clínicas</h1><p>Un espacio sencillo para mantener el registro del laboratorio al día.</p></div><nav className="main-nav" aria-label="Secciones"><span className="nav-label">Módulos</span>{views.map((view) => <button key={view.key} className={activeView === view.key ? 'nav-item is-active' : 'nav-item'} onClick={() => setActiveView(view.key)}><span className="nav-icon">{view.short}</span>{view.label}<span className="nav-count">{view.key === 'patients' ? patients.length : view.key === 'tests' ? tests.length : view.key === 'orders' ? orders.length : results.length}</span></button>)}</nav><div className="sidebar-note"><strong>Estado del sistema</strong><span><i className={apiOnline ? 'dot online' : 'dot'} />{apiOnline ? 'Operativo' : 'Revisar conexión'}</span></div></aside>
      <section className="main-content"><div className="mobile-heading"><p className="section-eyebrow">Panel de control</p><h1>Operaciones clínicas</h1></div><div className="stats-row"><div className="stat-card"><span className="stat-label">Pacientes</span><strong>{patients.length}</strong><small>registrados</small></div><div className="stat-card"><span className="stat-label">Pruebas activas</span><strong>{tests.filter((test) => test.isActive).length}</strong><small>en catálogo</small></div><div className="stat-card"><span className="stat-label">Órdenes abiertas</span><strong>{orders.filter((order) => order.statusCode !== 'COMPLETED' && order.statusCode !== 'CANCELLED').length}</strong><small>en seguimiento</small></div><div className="stat-card accent"><span className="stat-label">Resultados</span><strong>{results.length}</strong><small>reportados</small></div></div>{loading ? <div className="loading-card"><span className="spinner" />Cargando información...</div> : error ? <div className="error-card"><strong>No se pudo cargar la información</strong><p>{error}</p><button className="button button-primary" onClick={() => void loadData()}>Reintentar</button></div> : renderPanel()}</section>
    </div>
  </AuroraBackground>
}

export default App
