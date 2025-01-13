Configured setup:  
- pnpm  
- vite  
- playwright  
- vitest  
- prettier  
- global style scss  
- stylelint
- eslint
- eslint plugins:   
  - rxjs  
  - rxjs-angular  
  - simple-import-sort  
  - husky with lint-staged
- Specified node engine which is supported by Angular 19: `https://angular.dev/reference/versions`

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.
