import * as React from "react";
import { ReactElement } from "react";
import { icons, ns } from "solid-ui";
import { NamedNode } from "rdflib";
import { DataBrowserContext } from "pane-registry";
import { Note, NoteCard, readFromStore } from "./note";
import { createElement } from "./dom";

const Pane = {
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
    const note: Note = readFromStore(subject, store);
    const jsx: ReactElement = <NoteCard {...note} />;
    return createElement(jsx);
  },
};

export default Pane;
