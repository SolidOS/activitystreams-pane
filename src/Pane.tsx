import * as React from "react";
import { ReactElement } from "react";
import { Note, NoteCard, useNote } from "./note";
import { DataBrowserContext } from "pane-registry";
import { NamedNode } from "rdflib";

interface PaneProps {
  subject: NamedNode;
  context: DataBrowserContext;
}

export const Pane = ({ subject, context }: PaneProps): ReactElement => {
  const store = context.session.store;
  const note: Note = useNote(subject, store);
  return <NoteCard {...note} />;
};
