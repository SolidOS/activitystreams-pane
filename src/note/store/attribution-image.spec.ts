import { graph, sym } from "rdflib";
import { readAttribution } from "./attribution";
import { ns } from "solid-ui";

describe("read note attribution", () => {
  describe("GIVEN a note attributed to as:Person with image", () => {
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
        ns.as("image"),
        sym("https://pod.example/person#image"),
        sym("https://pod.example/person")
      );
      store.add(
        sym("https://pod.example/person#image"),
        ns.as("url"),
        sym("https://pod.example/person.png"),
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
      it("THEN the note attributes to the person with image", () => {
        expect(attribution.imageSrc).toEqual("https://pod.example/person.png");
      });
    });
  });
});
