import { graph, sym } from "rdflib";
import { readAttribution } from "./attribution";
import { ns } from "solid-ui";

describe("read note attribution", () => {
  describe("GIVEN a note without attribution", () => {
    let store;
    beforeEach(() => {
      store = graph();
      store.add(
        sym("https://pod.example/note#it"),
        ns.as("content"),
        "Just content, no attributedTo",
        sym("https://pod.example/note")
      );
    });
    describe("WHEN trying to read the attribution", () => {
      let attribution;
      beforeEach(() => {
        attribution = readAttribution(
          sym("https://pod.example/note#it"),
          store
        );
      });
      it("THEN a link attribution is returned", () => {
        expect(attribution).toEqual({
          discriminator: "NoAttribution",
        });
      });
    });
  });

  describe("GIVEN a store containing no further triples about the note's attribution", () => {
    let store;
    beforeEach(() => {
      store = graph();
      store.add(
        sym("https://pod.example/note#it"),
        ns.as("attributedTo"),
        sym("https://pod.example/person#me"),
        sym("https://pod.example/note")
      );
    });
    describe("WHEN trying to read the attribution", () => {
      let attribution;
      beforeEach(() => {
        attribution = readAttribution(
          sym("https://pod.example/note#it"),
          store
        );
      });
      it("THEN a link attribution is returned", () => {
        expect(attribution).toEqual({
          discriminator: "LinkAttribution",
          uri: "https://pod.example/person#me",
        });
      });
    });
  });

  describe("GIVEN a note attributed to as:Person with name 'Jane Doe'", () => {
    let store;
    beforeEach(() => {
      store = graph();
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
      let attribution;
      beforeEach(() => {
        attribution = readAttribution(
          sym("https://pod.example/note#it"),
          store
        );
      });
      it("THEN the note attributes to the person by name and WebID", () => {
        expect(attribution).toEqual({
          discriminator: "PersonAttribution",
          webId: "https://pod.example/person#me",
          name: "Jane Doe",
        });
      });
    });
  });
});
