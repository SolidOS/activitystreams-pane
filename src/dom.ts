import { createRoot } from 'react-dom/client'
import { ReactElement } from 'react'

export function createElement (jsx: ReactElement): HTMLElement {
  const element = document.createElement('div')
  element.style.padding = '1em'
  const root = createRoot(element)
  root.render(jsx)
  return element
}
