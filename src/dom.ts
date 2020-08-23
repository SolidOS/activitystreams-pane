import { render } from "react-dom";
import { ReactElement } from "react";

export function createElement(jsx: ReactElement): HTMLElement {
  const element = document.createElement("div");
  element.style.padding = "1em";
  render(jsx, element);
  return element;
}
