import type { HTMLAttributes, ReactNode } from 'react'

interface AuroraBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  showRadialGradient?: boolean
}

export function AuroraBackground({
  className = '',
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  const classes = [
    'aurora-background',
    showRadialGradient && 'aurora-background-radial',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} {...props}>
      <div className="aurora-background-layer" aria-hidden="true" />
      <div className="aurora-content">{children}</div>
    </div>
  )
}