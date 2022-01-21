import { DataBrowserContext, PaneRegistry } from "pane-registry";
import { store } from "solid-logic";

export const context: DataBrowserContext = {
  session: {
    store,
    paneRegistry: null as PaneRegistry,
  },
  dom: document,
  getOutliner: () => null,
};

export const fetcher = store.fetcher;
