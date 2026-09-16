interface FeedbackProps {
  message: string | null
  tone?: 'error' | 'success'
}

export function Feedback({ message, tone = 'error' }: FeedbackProps) {
  if (!message) return null

  return <p className={`feedback feedback-${tone}`} role={tone === 'error' ? 'alert' : 'status'}>{message}</p>
}

export function EmptyState({ message }: { message: string }) {
  return <div className="empty-state">{message}</div>
}

export function SectionHeading({ eyebrow, title, description, action }: {
  eyebrow: string
  title: string
  description: string
  action: React.ReactNode
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="section-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {action}
    </div>
  )
}