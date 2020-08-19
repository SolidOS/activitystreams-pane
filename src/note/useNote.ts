import { readFromStore } from "./data";
import { NamedNode } from "rdflib";
import { LiveStore } from "pane-registry";
import { Note } from "./types";
import { useState } from "react";

export const useNote = (subject: NamedNode, store: LiveStore): Note => {
  const [note] = useState(readFromStore(subject, store));
  return note;
};
