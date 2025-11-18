import { ReactElement } from 'react'
import * as React from 'react'

import { format } from 'timeago.js'

interface Props {
  className: string;
  value: Date;
}

const twoDigitsDateTime = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
} as const

export const FormattedDate = ({ value, className }: Props): ReactElement => {
  if (!value) return null
  const formatted = value.toLocaleDateString(undefined, twoDigitsDateTime)
  const relative = format(value)
  return (
    <p className={className}>
      {relative} · {formatted}
    </p>
  )
}
