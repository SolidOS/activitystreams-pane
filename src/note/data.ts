import { NamedNode } from "rdflib";
import { LiveStore } from "pane-registry";
import { ns } from "solid-ui";
import { Note } from "./types";

export function readFromStore(
  subject: NamedNode,
  store: LiveStore
): Note | null {
  const content = store.any(subject, ns.as("content"));
  const published = store.any(subject, ns.as("published"));
  const attributedTo = store.any(subject, ns.as("attributedTo"));

  if (!content) {
    return null;
  }

  return {
    content: content.value,
    published: published && new Date(published.value),
    attributedTo,
  };
}
