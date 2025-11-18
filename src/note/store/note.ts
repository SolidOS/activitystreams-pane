import { NamedNode, LiveStore } from 'rdflib'
import { ns } from 'solid-ui'
import { Note } from '../types'
import { readAttribution } from './attribution'

export function read (subject: NamedNode, store: LiveStore): Note | null {
  const content = store.any(subject, ns.as('content'))
  const published = store.any(subject, ns.as('published'))
  const attributedTo = readAttribution(subject, store)

  if (!content) {
    return null
  }

  return {
    content: content.value,
    published: published && new Date(published.value),
    attributedTo,
  }
}
