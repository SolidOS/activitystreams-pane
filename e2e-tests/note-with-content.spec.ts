import { default as pane } from "../src";
import { graph, parse, sym } from "rdflib";
import { DataBrowserContext } from "pane-registry";

describe("activitystreams-pane", () => {
  let store;
  beforeEach(() => {
    store = graph();
  });

  describe("GIVEN a published textual note attributed to a named node", () => {
    const noteTurtle = `
      @prefix : <#> .
      @prefix as: <https://www.w3.org/ns/activitystreams#> .
      @prefix XML: <http://www.w3.org/2001/XMLSchema#>.

      :it a as:Note;
          as:content "The content of the note" ;
          as:published  "2020-08-18T21:40:52+0200"^^XML:dateTime ;
          as:attributedTo </person#me> .
    `;

    beforeEach(() => {
      parse(noteTurtle, store, "https://pod.example/note");
    });

    describe("WHEN the pane is rendered", () => {
      let html;

      beforeEach(() => {
        html = pane.render(sym("https://pod.example/note#it"), {
          session: { store },
        } as DataBrowserContext);
      });

      it("THEN the content is shown", () => {
        expect(html).toHaveTextContent("The content of the note");
      });

      it("AND the published date is shown in current locale", () => {
        expect(html).toHaveTextContent(
          new Date("2020-08-18").toLocaleDateString(undefined, {
            month: "2-digit",
          })
        );
      });

      it("AND the attribution link is shown", () => {
        expect(html).toHaveTextContent("https://pod.example/person#me");
      });
    });
  });

  describe("GIVEN note attributed to a person in the same document", () => {
    const noteTurtle = `
      @prefix : <#> .
      @prefix as: <https://www.w3.org/ns/activitystreams#> .
      @prefix XML: <http://www.w3.org/2001/XMLSchema#>.

      :it a as:Note;
          as:content "The content of the note" ;
          as:published  "2020-08-18T21:40:52+0200"^^XML:dateTime ;
          as:attributedTo :me .
          
      :me a as:Person;
          as:name "Jane Doe" .
    `;

    beforeEach(() => {
      parse(noteTurtle, store, "https://pod.example/note");
    });

    describe("WHEN the pane is rendered", () => {
      let html;

      beforeEach(() => {
        html = pane.render(sym("https://pod.example/note#it"), {
          session: { store },
        } as DataBrowserContext);
      });

      it("THEN the person's name is shown", () => {
        expect(html).toHaveTextContent("Jane Doe");
      });
    });
  });
});
