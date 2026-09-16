import { useState } from 'react'
import { api } from '../services/http'
import type { Patient } from '../types/api'
import { EmptyState, Feedback, SectionHeading } from './Ui'

type PatientForm = {
  documentId: string
  firstName: string
  lastName: string
  birthDate: string
  email: string
  phone: string
}

const blankForm: PatientForm = { documentId: '', firstName: '', lastName: '', birthDate: '', email: '', phone: '' }

function toForm(patient: Patient): PatientForm {
  return { documentId: patient.documentId, firstName: patient.firstName, lastName: patient.lastName, birthDate: patient.birthDate.slice(0, 10), email: patient.email ?? '', phone: patient.phone ?? '' }
}

export function PatientPanel({ patients, onChanged }: { patients: Patient[]; onChanged: () => Promise<void> }) {
  const [form, setForm] = useState<PatientForm>(blankForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = (field: keyof PatientForm, value: string) => setForm((current) => ({ ...current, [field]: value }))
  const reset = () => { setForm(blankForm); setEditingId(null); setError(null) }

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!form.documentId || !form.firstName || !form.lastName || !form.birthDate) { setError('Completa documento, nombre, apellido y fecha de nacimiento.'); return }
    setBusy(true); setError(null)
    try {
      const body = { ...form, email: form.email || null, phone: form.phone || null }
      if (editingId) await api.patients.update(editingId, body)
      else await api.patients.create(body)
      reset(); await onChanged()
    } catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'No se pudo guardar el paciente.') }
    finally { setBusy(false) }
  }

  async function remove(patient: Patient) {
    if (!window.confirm(`¿Eliminar a ${patient.firstName} ${patient.lastName}?`)) return
    setBusy(true); setError(null)
    try { await api.patients.remove(patient.id); if (editingId === patient.id) reset(); await onChanged() }
    catch (requestError) { setError(requestError instanceof Error ? requestError.message : 'No se pudo eliminar el paciente.') }
    finally { setBusy(false) }
  }

  return <section className="workspace-section">
    <SectionHeading eyebrow="Pacientes" title="Personas atendidas" description="Administra los datos básicos de cada paciente." action={<button className="button button-primary" onClick={reset}>+ Nuevo paciente</button>} />
    <div className="content-grid">
      <form className="form-card" onSubmit={submit}>
        <div className="form-card-heading"><h3>{editingId ? 'Editar paciente' : 'Nuevo paciente'}</h3><span>{editingId ? `ID #${editingId}` : 'Datos personales'}</span></div>
        <div className="form-grid">
          <label>Documento<input value={form.documentId} onChange={(event) => update('documentId', event.target.value)} /></label>
          <label>Nombre<input value={form.firstName} onChange={(event) => update('firstName', event.target.value)} /></label>
          <label>Apellido<input value={form.lastName} onChange={(event) => update('lastName', event.target.value)} /></label>
          <label>Fecha de nacimiento<input type="date" value={form.birthDate} onChange={(event) => update('birthDate', event.target.value)} /></label>
          <label>Correo electrónico<input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} /></label>
          <label>Teléfono<input value={form.phone} onChange={(event) => update('phone', event.target.value)} /></label>
        </div>
        <Feedback message={error} />
        <div className="form-actions"><button className="button button-primary" disabled={busy}>{busy ? 'Guardando...' : editingId ? 'Guardar cambios' : 'Crear paciente'}</button>{editingId && <button type="button" className="button button-quiet" onClick={reset}>Cancelar</button>}</div>
      </form>
      <div className="table-card"><div className="table-card-heading"><h3>Pacientes registrados</h3><span>{patients.length} registros</span></div>{patients.length === 0 ? <EmptyState message="Todavía no hay pacientes registrados." /> : <div className="table-scroll"><table><thead><tr><th>Paciente</th><th>Documento</th><th>Contacto</th><th aria-label="Acciones" /></tr></thead><tbody>{patients.map((patient) => <tr key={patient.id}><td><strong>{patient.firstName} {patient.lastName}</strong><small>Nacimiento: {patient.birthDate.slice(0, 10)}</small></td><td>{patient.documentId}</td><td><small>{patient.email || 'Sin correo'}</small><small>{patient.phone || 'Sin teléfono'}</small></td><td className="row-actions"><button className="text-button" onClick={() => { setEditingId(patient.id); setForm(toForm(patient)); setError(null) }}>Editar</button><button className="text-button danger" onClick={() => void remove(patient)}>Eliminar</button></td></tr>)}</tbody></table></div>}</div>
    </div>
  </section>
}