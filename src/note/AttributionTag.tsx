import * as React from 'react'
import { ReactElement } from 'react'
import {
  Attribution,
  isLinkAttribution,
  isPersonAttribution,
  PersonAttribution,
} from './types'

interface Props {
  to: Attribution;
}

export const AttributionTag = ({ to }: Props): ReactElement => {
  if (isLinkAttribution(to)) {
    return <a href={to.uri}>{to.uri}</a>
  } else if (isPersonAttribution(to)) {
    return <PersonAttributionTag {...to} />
  } else {
    return null
  }
}

const PersonAttributionTag = ({
  webId,
  name,
  imageSrc,
}: PersonAttribution): ReactElement => {
  return (
    <>
      {imageSrc && <img height='47' width='47' alt={name} src={imageSrc} />}
      <a href={webId}>{name}</a>
    </>
  )
}
