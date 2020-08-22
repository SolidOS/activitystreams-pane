import { ns } from "solid-ui";
import { NamedNode, Node, sym } from "rdflib";
import { LiveStore } from "pane-registry";
import { Attribution, LinkAttribution } from "../types";

/**
 * Constructs an attribution object for the node the subject is attributed to.
 */
export function readAttribution(
  subject: NamedNode,
  store: LiveStore
): Attribution {
  const attributedTo: Node = store.any(subject, ns.as("attributedTo"));
  return read(attributedTo, store);
}

/**
 * Constructs an attribution object for the given node with data read from the store
 */
function read(attributedTo: Node, store: LiveStore): Attribution {
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

/**
 * Fetches the given attribution uri and returns an updated attribution with data from the fetched resource
 */
export async function fetchAttribution(
  attribution: LinkAttribution,
  store: LiveStore
): Promise<Attribution> {
  const attributionNode = sym(attribution.uri);
  await store.fetcher.load(attributionNode);
  return read(attributionNode, store);
}
