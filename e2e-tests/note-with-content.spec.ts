import { default as pane } from "../src";
import { graph, sym } from "rdflib";
import { DataBrowserContext } from "pane-registry";
import { ns } from "solid-ui";

const store = graph();

describe("activitystreams-pane", () => {
  describe("note with content", () => {
    beforeEach(() => {
      store.add(
        sym("https://pod.example/note#it"),
        ns.as("content"),
        "The content of the note",
        sym("https://pod.example/note")
      );
    });

    it("should render note content", () => {
      const result = pane.render(sym("https://pod.example/note#it"), {
        session: { store },
      } as DataBrowserContext);
      expect(result).toHaveTextContent("The content of the note");
    });
  });
});
