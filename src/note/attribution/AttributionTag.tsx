import * as React from "react";
import { ReactElement } from "react";
import { Node } from "rdflib";
import { useAttribution } from "./useAttribution";

interface Props {
  src: Node;
}

export const AttributionTag = ({ src }: Props): ReactElement => {
  if (!src) return null;
  const { uri } = useAttribution(src);
  return <a href={uri}>{uri}</a>;
};
