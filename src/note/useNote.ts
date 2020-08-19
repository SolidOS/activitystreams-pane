import { read } from "./store/note";
import { NamedNode } from "rdflib";
import { LiveStore } from "pane-registry";
import { Note } from "./types";
import { useState } from "react";

export const useNote = (subject: NamedNode, store: LiveStore): Note => {
  const [note] = useState(read(subject, store));
  return note;
};
