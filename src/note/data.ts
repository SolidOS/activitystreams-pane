import { NamedNode } from "rdflib";
import { LiveStore } from "pane-registry";

interface Note {
  content: string;
}

export function readFromStore(
  subject: NamedNode,
  store: LiveStore
): Note | null {
  return null;
}
