import { renderHook } from "@testing-library/react-hooks";
import { useNote } from "./useNote";
import { sym } from "rdflib";
import { store } from "solid-logic";
import { read } from "./store/note";
import { Attribution, Note } from "./types";
import { fetchAttribution } from "./store/attribution";

jest.mock("./store/note");
jest.mock("./store/attribution");

describe("use note", () => {
  describe("GIVEN a note with no attribution", () => {
    beforeEach(() => {
      (read as jest.Mock<Note>).mockReturnValue({
        content: "note content",
        attributedTo: {
          discriminator: "NoAttribution",
        },
      });
    });

    describe("WHEN the hook renders", () => {
      let rendered;
      beforeEach(() => {
        rendered = renderHook(() =>
          useNote(sym("https://pod.example/note#it"), store)
        );
      });

      it("THEN the note is returned", () => {
        expect(rendered.result.current).toEqual({
          content: "note content",
          attributedTo: {
            discriminator: "NoAttribution",
          },
        });
      });
    });
  });

  describe("GIVEN a note with attribution linked to a person", () => {
    beforeEach(() => {
      (read as jest.Mock<Note>).mockReturnValue({
        content: "note content",
        attributedTo: {
          discriminator: "LinkAttribution",
          uri: "https://pod.example/person#me",
        },
      });
      (fetchAttribution as jest.Mock<Promise<Attribution>>).mockResolvedValue({
        discriminator: "PersonAttribution",
        webId: "https://pod.example/person#me",
        name: "Jane Doe",
      });
    });

    describe("WHEN the hook renders", () => {
      let rendered;
      beforeEach(async () => {
        rendered = renderHook(() =>
          useNote(sym("https://pod.example/note#it"), store)
        );
        await rendered.waitForNextUpdate();
      });

      it("THEN the linked attribution is fetched", () => {
        expect(fetchAttribution as jest.Mock).toHaveBeenCalledWith(
          {
            discriminator: "LinkAttribution",
            uri: "https://pod.example/person#me",
          },
          store
        );
      });

      it("AND the note is rendered with the fetched attribution", async () => {
        expect(rendered.result.current).toEqual({
          content: "note content",
          attributedTo: {
            discriminator: "PersonAttribution",
            webId: "https://pod.example/person#me",
            name: "Jane Doe",
          },
        });
      });
    });
  });
});
