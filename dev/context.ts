import { DataBrowserContext, PaneRegistry } from "pane-registry";
import { store } from "solid-ui";

export const context: DataBrowserContext = {
  session: {
    store,
    paneRegistry: null as PaneRegistry,
  },
  dom: document,
  getOutliner: () => null,
};

export const fetcher = store.fetcher;
