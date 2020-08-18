import { default as pane } from "../src";
import { graph, parse, sym } from "rdflib";
import { DataBrowserContext } from "pane-registry";

const store = graph();

describe("activitystreams-pane", () => {
  describe("note with content", () => {
    const noteTurtle = `
      @prefix : <#> .
      @prefix as: <https://www.w3.org/ns/activitystreams#> .

      :it a as:Note;
          as:content "The content of the note" .
    `;

    beforeEach(() => {
      parse(noteTurtle, store, "https://pod.example/note");
    });

    it("should render note content", () => {
      const result = pane.render(sym("https://pod.example/note#it"), {
        session: { store },
      } as DataBrowserContext);
      expect(result).toHaveTextContent("The content of the note");
    });
  });
});
