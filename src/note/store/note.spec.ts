import { graph, sym } from "rdflib";
import { read } from "./note";
import { ns } from "solid-ui";
import { readAttribution } from "./attribution";

jest.mock("./attribution");

describe("read note from store", () => {
  beforeEach(() => {
    (readAttribution as jest.Mock).mockReturnValue({
      discriminator: "NoAttribution",
    });
  });

  describe("GIVEN an empty store", () => {
    let store;
    beforeEach(() => {
      store = graph();
    });
    describe("WHEN trying to read a note", () => {
      let note;
      beforeEach(() => {
        note = read(sym("https://pod.example/note#it"), store);
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
        note = read(sym("https://pod.example/note#it"), store);
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
        note = read(sym("https://pod.example/note#it"), store);
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

  describe("GIVEN a store containing a note that is attributed", () => {
    let store;
    beforeEach(() => {
      store = graph();
      store.add(
        sym("https://pod.example/note#it"),
        ns.as("content"),
        "The content of the note",
        sym("https://pod.example/note")
      );
      (readAttribution as jest.Mock).mockReturnValue({
        discriminator: "FakeAttribution",
      });
    });
    describe("WHEN trying to read a note", () => {
      let note;
      beforeEach(() => {
        note = read(sym("https://pod.example/note#it"), store);
      });
      it("THEN the note links to the attribution", () => {
        expect(note).not.toBeNull();
        expect(note.attributedTo).toEqual({
          discriminator: "FakeAttribution",
        });
      });
    });
  });
});
