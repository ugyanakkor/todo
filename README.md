## Installation

To install the packages, firstly install [pnpm](https://pnpm.io/installation), than run:

```bash
pnpm install
```

## Development server

To start a local development server with [Vite](https://vite.dev/), run:

```bash
pnpm start
```

Once the server is running, open your browser and navigate to `http://localhost:5173/`. The application will automatically reload whenever you modify any of the source files.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
pnpm test
```

## Running end-to-end tests

For integration(e2e) testing with [Playwright](https://playwright.dev/), run:

```bash
pnpm e2e
```
For watch mode run:

```bash
pnpm e2e --ui
```

Further improvements to the project could include:

- Utilizing a design system, such as Angular Material, to enhance UI consistency and accessibility.
- Writing additional unit tests to ensure comprehensive coverage.
- Expanding end-to-end (E2E) test scenarios to include features like TODO filter buttons and pagination.
- Refactoring TODO list items into a smaller, reusable list-item component (a "dumb" component) for better modularity and maintainability.
