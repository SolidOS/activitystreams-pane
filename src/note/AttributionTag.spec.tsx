import * as React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { AttributionTag } from "./AttributionTag";

describe("AttributionTag", () => {
  describe("attribution to person without image", () => {
    beforeEach(() => {
      render(
        <AttributionTag
          to={{
            discriminator: "PersonAttribution",
            webId: "https://pod.example/person#me",
            name: "Jane Doe",
          }}
        />
      );
    });

    it("renders name", () => {
      expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    });

    it("links name to WebID", () => {
      const name = screen.getByText("Jane Doe");
      expect(name).toContainHTML(
        '<a href="https://pod.example/person#me">Jane Doe</a>'
      );
    });

    it("does not show an image", () => {
      expect(screen.queryByAltText("Jane Doe")).not.toBeInTheDocument();
    });
  });

  describe("attribution to person with image", () => {
    beforeEach(() => {
      render(
        <AttributionTag
          to={{
            discriminator: "PersonAttribution",
            webId: "https://pod.example/person#me",
            name: "Jane Doe",
            imageSrc: "https://pod.example/person.png",
          }}
        />
      );
    });

    it("does show an image", () => {
      const element = screen.getByAltText("Jane Doe");
      expect(element.tagName).toEqual("IMG");
      expect(element).toHaveAttribute("src", "https://pod.example/person.png");
    });
  });
});
