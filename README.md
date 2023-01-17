# SampleAngularApp2023

This is a practical sample of an e-commerce application using Angular(version 15.0.5.). I hope you will have fun with this application. I implemented it using my past experience and the requests I received from customers to improve it.
Also, since I created this application from scratch while working two jobs in a week, there is still a lot of room for improvement, but I implemented it with future scalability in mind. I look forward to brushing it up in the future :)

# Configuration

I didn't have time to build a backend, so this time I used [Firebase](https://firebase.google.com/) and [Algolia](https://www.algolia.com/) for the search function.
I used [MDB Angular](https://mdbootstrap.com/), an open-source UI library, because I had experience using it in the past.
I also use [Cypress](https://www.cypress.io/) for testing, and [Prettier](https://prettier.io/), [ESLint](https://eslint.org/) and [Stylelint](https://stylelint.io/) for formatting styles.

## Quick Start

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:4200
$ npm run start

# build the project
$ npm run build

# build the project for production
$ npm run build:pro

# test the project
$ npm run e2e

# formatting the project
$ npm run eslint
```

## Installation

```
git clone git@github.com:suema0331/Angular-EC-Smaple-2023.git && cd Angular-EC-Smaple-2023 && npm install
```

## Start the server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

```bash
npm run start
```

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.
Run `npm run build:pro` to specify the build for the production configuration; Angular modules and components are to be compiled and optimized at build time.

```bash
npm run build
npm run build:pro
```

## Documentation

For documentation purposes, I have written docs.md on each directory.

e.g.,

- https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/app/pages/docs.md
- https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/app/service/docs.md

## Testing

This application uses [Cypress](https://www.cypress.io/) for E2E testing. The test file are written in Typescript in the `cypress/e2e/` directory. (`cypress/e2e/signup.spec.cy.ts`)

```bash
npm run e2e
```
