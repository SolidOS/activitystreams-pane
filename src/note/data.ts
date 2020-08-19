import { NamedNode, Node } from "rdflib";
import { LiveStore } from "pane-registry";
import { ns } from "solid-ui";
import { Attribution, Note } from "./types";

function readAttribution(
  subject: NamedNode,
  store: LiveStore
): Attribution | null {
  const attributedTo: Node = store.any(subject, ns.as("attributedTo"));
  if (attributedTo instanceof NamedNode) {
    const types = store.findTypeURIs(attributedTo);
    if (types[ns.as("Person").uri]) {
      const name: string = store.anyValue(attributedTo, ns.as("name")) || "";
      return {
        discriminator: "PersonAttribution",
        webId: attributedTo.uri,
        name,
      };
    } else {
      return {
        discriminator: "LinkAttribution",
        uri: attributedTo.uri,
      };
    }
  }
  return {
    discriminator: "NoAttribution",
  };
}

export function readFromStore(
  subject: NamedNode,
  store: LiveStore
): Note | null {
  const content = store.any(subject, ns.as("content"));
  const published = store.any(subject, ns.as("published"));
  const attributedTo = readAttribution(subject, store);

  if (!content) {
    return null;
  }

  return {
    content: content.value,
    published: published && new Date(published.value),
    attributedTo,
  };
}
