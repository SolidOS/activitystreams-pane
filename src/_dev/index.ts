import { sym } from "rdflib";
import { default as pane } from "..";
import { context, fetcher } from "./context";

const noteUri =
  "https://angelo.veltens.org/public/tweets/2020/01#1216690474544771072";

fetcher.load(noteUri).then(() => {
  const app = pane.render(sym(noteUri), context);
  console.log(app);

  document.getElementById("app").replaceWith(app);
});
