import * as React from 'react'
import { icons, ns } from 'solid-ui'
import { NamedNode, Store } from 'rdflib'
import { DataBrowserContext } from 'pane-registry'
import { createElement } from './dom'
import { Pane } from './Pane'

const thisPane = {
  global: false,

  icon: icons.iconBase + 'noun_15695.svg',

  name: 'activitystreams',

  label: function (
    subject: NamedNode,
    context: DataBrowserContext
  ): string | null {
    const t = (context.session.store as Store).findTypeURIs(subject)
    if (t[ns.as('Note').uri]) {
      return 'Note'
    }
    return null
  },

  render: (subject: NamedNode, context: DataBrowserContext): HTMLElement => {
    return createElement(<Pane subject={subject} context={context} />)
  },
}

export default thisPane
