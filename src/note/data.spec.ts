import { graph, sym } from "rdflib";
import { readFromStore } from "./data";

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
});
