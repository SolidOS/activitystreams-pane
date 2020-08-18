import { Node, NamedNode } from "rdflib";
import { Attribution } from "./types";

export const useAttribution = (node: Node): Attribution => {
  return {
    uri: node instanceof NamedNode ? node.uri : null,
  };
};
