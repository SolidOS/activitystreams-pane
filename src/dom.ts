import { render } from "react-dom";
import { ReactElement } from "react";

export function createElement(jsx: ReactElement): HTMLElement {
  const element = document.createElement("div");
  render(jsx, element);
  return element;
}
