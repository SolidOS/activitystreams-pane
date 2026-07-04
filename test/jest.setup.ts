import "@testing-library/jest-dom";

// Polyfill for encoding which isn't present globally in jsdom
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Some third-party dependencies (e.g. solid-ui's icon custom elements) ship
// more than one dist entry point (main index + per-component bundles), each
// of which independently registers the same custom element tag on import.
// Loading more than one of those entry points in a single test's module
// graph makes jsdom's real customElements.define() throw:
//   NotSupportedError: This name has already been registered in the registry.
// Guard against double-registration here instead of patching third-party dist code.
if (typeof window !== 'undefined' && window.customElements) {
  const originalDefine = window.customElements.define.bind(window.customElements);
  window.customElements.define = ((name: string, constructor: CustomElementConstructor, options?: ElementDefinitionOptions) => {
    if (window.customElements.get(name)) {
      return;
    }
    return originalDefine(name, constructor, options);
  }) as typeof window.customElements.define;
}
