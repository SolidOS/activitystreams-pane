import * as React from "react";
import { ReactElement } from "react";
import {
  Attribution,
  isLinkAttribution,
  isPersonAttribution,
  PersonAttribution,
} from "./types";

interface Props {
  to: Attribution;
}

export const AttributionTag = ({ to }: Props): ReactElement => {
  if (isLinkAttribution(to)) {
    return <a href={to.uri}>{to.uri}</a>;
  } else if (isPersonAttribution(to)) {
    return <PersonAttributionTag {...to} />;
  } else {
    return null;
  }
};

const PersonAttributionTag = ({
  webId,
  name,
}: PersonAttribution): ReactElement => {
  return (
    <>
      <img alt={name} src="https://i.pravatar.cc/300" />
      <a href={webId}>{name}</a>
    </>
  );
};
