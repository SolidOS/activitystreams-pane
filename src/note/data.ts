import { NamedNode } from "rdflib";
import { LiveStore } from "pane-registry";
import { ns } from "solid-ui";
import { Note } from "./types";

export function readFromStore(
  subject: NamedNode,
  store: LiveStore
): Note | null {
  const content = store.any(subject, ns.as("content"));

  if (!content) {
    return null;
  }

  return {
    content: content.value,
  };
}
