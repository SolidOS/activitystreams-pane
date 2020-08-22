import { fetcher, graph, parse, sym } from "rdflib";
import { default as pane } from "../src";
import { DataBrowserContext } from "pane-registry";

import { getByText, waitFor } from "@testing-library/react";
import { givenMolid } from "molid/lib/molid-jest";

describe("note with fetching attribution", () => {
  let store;
  beforeEach(() => {
    store = graph();
    store.fetcher = fetcher(store, {});
  });

  givenMolid("with a typical Solid WebID profile", (molid) => {
    describe("GIVEN note attributed to a typical solid WebID", () => {
      beforeEach(() => {
        const noteTurtle = `
      @prefix : <#> .
      @prefix as: <https://www.w3.org/ns/activitystreams#> .
      @prefix XML: <http://www.w3.org/2001/XMLSchema#>.

      :it a as:Note;
          as:content "The content of the note" ;
          as:published  "2020-08-18T21:40:52+0200"^^XML:dateTime ;
          as:attributedTo <${molid.uri("/profile/card#me")}> .
    `;
        parse(noteTurtle, store, "https://pod.example/note");
      });

      describe("WHEN the pane is rendered", () => {
        let html;

        beforeEach(() => {
          html = pane.render(sym("https://pod.example/note#it"), {
            session: { store },
          } as DataBrowserContext);
        });

        it("THEN the person's WebID is shown while loading", () => {
          expect(html).toHaveTextContent(molid.uri("/profile/card#me"));
        });

        it("AND the person's name is shown eventually", async () => {
          await waitFor(
            () => {
              expect(getByText(html, "A. N. Other")).toBeInTheDOM(html);
            },
            { container: html }
          );
        });
      });
    });
  });
});
