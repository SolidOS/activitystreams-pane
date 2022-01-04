import { read } from "./store/note";
import { NamedNode } from "rdflib";
import { LiveStore } from "solid-logic";
import { isLinkAttribution, Note } from "./types";
import { useEffect, useState } from "react";
import { fetchAttribution } from "./store/attribution";

export const useNote = (subject: NamedNode, store: LiveStore): Note => {
  const [note, setNote] = useState(read(subject, store));
  useEffect(() => {
    async function fetch() {
      if (isLinkAttribution(note.attributedTo)) {
        const attribution = await fetchAttribution(note.attributedTo, store);
        setNote({ ...note, attributedTo: attribution });
      }
    }
    fetch();
  }, []);

  return note;
};
