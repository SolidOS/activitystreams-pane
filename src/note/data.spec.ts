import { graph, sym } from "rdflib";
import { readFromStore } from "./data";
import { ns } from "solid-ui";

describe("read note from store", () => {
  describe("GIVEN an empty store", () => {
    let store;
    beforeEach(() => {
      store = graph();
    });
    describe("WHEN trying to read a note", () => {
      let note;
      beforeEach(() => {
        note = readFromStore(sym("https://pod.example/note#it"), store);
      });
      it("THEN it is null", () => {
        expect(note).toBeNull();
      });
    });
  });

  describe("GIVEN a store containing a note with content", () => {
    let store;
    beforeEach(() => {
      store = graph();
      store.add(
        sym("https://pod.example/note#it"),
        ns.as("content"),
        "The content of the note",
        sym("https://pod.example/note")
      );
    });
    describe("WHEN trying to read a note", () => {
      let note;
      beforeEach(() => {
        note = readFromStore(sym("https://pod.example/note#it"), store);
      });
      it("THEN the note has a content", () => {
        expect(note).not.toBeNull();
        expect(note.content).toEqual("The content of the note");
      });
      it("BUT it has no published date", () => {
        expect(note).not.toBeNull();
        expect(note.published).toBeNull();
      });
      it("AND it has no attribution", () => {
        expect(note).not.toBeNull();
        expect(note.attributedTo).toEqual({
          discriminator: "NoAttribution",
        });
      });
    });
  });

  describe("GIVEN a store containing a note with content and publication date", () => {
    let store;
    beforeEach(() => {
      store = graph();
      store.add(
        sym("https://pod.example/note#it"),
        ns.as("content"),
        "The content of the note",
        sym("https://pod.example/note")
      );
      store.add(
        sym("https://pod.example/note#it"),
        ns.as("published"),
        new Date("2020-01-13T11:56:28Z"),
        sym("https://pod.example/note")
      );
    });
    describe("WHEN trying to read a note", () => {
      let note;
      beforeEach(() => {
        note = readFromStore(sym("https://pod.example/note#it"), store);
      });
      it("THEN the note contains the date it was published", () => {
        expect(note).not.toBeNull();
        expect(note.published).toEqual(new Date("2020-01-13T11:56:28Z"));
      });

      it("BUT it has no attribution", () => {
        expect(note).not.toBeNull();
        expect(note.attributedTo).toEqual({
          discriminator: "NoAttribution",
        });
      });
    });
  });

  describe("GIVEN a store containing a note that is attributed to a named node", () => {
    let store;
    beforeEach(() => {
      store = graph();
      store.add(
        sym("https://pod.example/note#it"),
        ns.as("content"),
        "The content of the note",
        sym("https://pod.example/note")
      );
      store.add(
        sym("https://pod.example/note#it"),
        ns.as("attributedTo"),
        sym("https://pod.example/person#me"),
        sym("https://pod.example/note")
      );
    });
    describe("WHEN trying to read a note", () => {
      let note;
      beforeEach(() => {
        note = readFromStore(sym("https://pod.example/note#it"), store);
      });
      it("THEN the note links to the attribution", () => {
        expect(note).not.toBeNull();
        expect(note.attributedTo).toEqual({
          discriminator: "LinkAttribution",
          uri: "https://pod.example/person#me",
        });
      });
    });
  });

  describe("GIVEN a store containing a note that is attributed to Jane Doe", () => {
    let store;
    beforeEach(() => {
      store = graph();
      store.add(
        sym("https://pod.example/note#it"),
        ns.as("content"),
        "The content of the note",
        sym("https://pod.example/note")
      );
      store.add(
        sym("https://pod.example/note#it"),
        ns.as("attributedTo"),
        sym("https://pod.example/person#me"),
        sym("https://pod.example/note")
      );
      store.add(
        sym("https://pod.example/person#me"),
        ns.rdf("type"),
        ns.as("Person"),
        sym("https://pod.example/person")
      );
      store.add(
        sym("https://pod.example/person#me"),
        ns.as("name"),
        "Jane Doe",
        sym("https://pod.example/person")
      );
    });
    describe("WHEN trying to read a note", () => {
      let note;
      beforeEach(() => {
        note = readFromStore(sym("https://pod.example/note#it"), store);
      });
      it("THEN the note attributes to the person by name and WebID", () => {
        expect(note).not.toBeNull();
        expect(note.attributedTo).toEqual({
          discriminator: "PersonAttribution",
          webId: "https://pod.example/person#me",
          name: "Jane Doe",
        });
      });
    });
  });
});
