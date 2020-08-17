import * as React from "react";
import { Node } from "rdflib";
import {ReactElement} from "react";

interface Props {
  to: Node;
}

export const Attribution = ({ to }: Props): ReactElement => {
  if (!to) return null;
  return <a href={to.value}>{to.value}</a>;
};
