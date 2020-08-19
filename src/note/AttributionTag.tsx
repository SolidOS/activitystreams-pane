import * as React from "react";
import { ReactElement } from "react";
import { Attribution, isLinkAttribution, isPersonAttribution } from "./types";

interface Props {
  to: Attribution;
}

export const AttributionTag = ({ to }: Props): ReactElement => {
  if (isLinkAttribution(to)) {
    return <a href={to.uri}>{to.uri}</a>;
  } else if (isPersonAttribution(to)) {
    return <a href={to.webId}>{to.name}</a>;
  } else {
    return null;
  }
};
