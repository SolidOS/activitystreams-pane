# activitystreams-pane

A visualization of [Activity Streams](https://www.w3.org/TR/activitystreams-vocabulary/) types for solid-panes

## Demo

📗 [Storybook](https://solid.github.io/activitystreams-pane/)

## Currently supported types

- [Note](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-note)

## Contribute

### Tech stack

- Typescript
- React
- Jest
- Eslint
- Prettier
- SolidOS

### Tests

To run all tests:
```shell script
npm run test
```

#### Unit tests

Unit tests use `jest` and are placed next to the tested file as `*.spec.ts` files.

#### E2E tests

End-to-End (E2E) tests verify the rendering of the whole pane and are placed under `./e2e-tests`.

### Dev Server

Start a webpack dev server:

```shell script
npm start
```

Visit `http://localhost:8080/` to render the pane. Adjust `const noteUri` in `./dev/index.ts` to show a
 different resource.
 
### Build

```
npm run build
```

The build is done by `tsc`, webpack is only used as dev server and not for production build.