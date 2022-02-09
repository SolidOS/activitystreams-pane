import { fetcher, graph, parse, sym } from "rdflib";
import { default as pane } from "../src";
import { DataBrowserContext } from "pane-registry";

import { getByText, getByAltText, waitFor, act } from "@testing-library/react";
import { givenMolid } from "molid/lib/molid-jest";

describe("note with fetching attribution", () => {
  let store;
  beforeAll(() => {
    store = graph();
    store.fetcher = fetcher(store, {});
  });

  givenMolid("with a typical Solid WebID profile", (molid) => {
    describe("GIVEN note attributed to a typical solid WebID", () => {
      beforeAll(() => {
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

        beforeAll(() => {
          act(() => {
            html = pane.render(sym("https://pod.example/note#it"), {
              session: { store },
            } as DataBrowserContext);
          });
        });

        it("THEN the person's WebID is shown while loading", () => {
          expect(html).toHaveTextContent(molid.uri("/profile/card#me"));
        });

        it("AND the content of the note is shown", () => {
          expect(html).toHaveTextContent("The content of the note");
        });

        it("AND the published date is shown in current locale", () => {
          expect(html).toHaveTextContent(
            new Date("2020-08-18").toLocaleDateString(undefined, {
              month: "2-digit",
            })
          );
        });

        it("AND the person's name is shown eventually", async () => {
          await waitFor(
            () => {
              expect(getByText(html, "A. N. Other")).toBeInTheDOM(html);
            },
            { container: html }
          );
        });

        it("AND the person's picture is shown eventually", async () => {
          await waitFor(
            () => {
              expect(getByAltText(html, "A. N. Other")).toHaveAttribute(
                "src",
                "https://i.pravatar.cc/300"
              );
            },
            { container: html }
          );
        });
      });
    });
  });
});
