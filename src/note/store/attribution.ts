import { ns } from "solid-ui";
import { NamedNode, Node } from "rdflib";
import { LiveStore } from "pane-registry";
import { Attribution } from "../types";

export function readAttribution(
  subject: NamedNode,
  store: LiveStore
): Attribution {
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
