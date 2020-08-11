import { icons, ns } from "solid-ui";
import { NamedNode, Node } from "rdflib";
import { DataBrowserContext } from "pane-registry";

export const NotePane = {
  global: false,

  icon: icons.iconBase + "noun_15695.svg",

  name: "profile",

  label: function (
    subject: NamedNode,
    context: DataBrowserContext
  ): string | null {
    const t = context.session.store.findTypeURIs(subject);
    if (t[ns.as("Note").uri]) {
      return "Note";
    }
    return null;
  },

  render: (subject: NamedNode, context: DataBrowserContext): HTMLElement => {
    const store = context.session.store;
    const content: Node = store.any(subject, ns.as("content"));

    const element = document.createElement("div");

    const heading = document.createElement("h2");
    const text = document.createTextNode("This is a as:Note");
    heading.appendChild(text);

    const contentDiv = document.createElement("div");
    const contentText = document.createTextNode(content.value);
    contentDiv.appendChild(contentText);

    element.appendChild(heading);
    element.appendChild(contentDiv);
    return element;
  },
};
