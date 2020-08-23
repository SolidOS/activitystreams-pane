import { sym } from "rdflib";
import { default as pane } from "../src";
import { context, fetcher } from "./context";

const noteUri = "http://localhost:3333/notes/by-as-actor#it";
//const noteUri = "http://localhost:3333/notes/by-foaf-person#it";
// const noteUri = "http://localhost:3333/notes/by-vcard-individual#it";

fetcher.load(noteUri).then(() => {
  const app = pane.render(sym(noteUri), context);
  console.log(app);

  document.getElementById("app").replaceWith(app);
});
