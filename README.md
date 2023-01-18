# SampleAngularApp2023

This is a practical sample of an e-commerce application using `Angular`(version 15.0.5.). I hope you will have fun with this application. I implemented it using my past experience and the requests I received from customers to improve it.
Also, since I created this application from scratch while working two jobs in a week, there is still a lot of room for improvement, but I implemented it with future scalability in mind. I look forward to brushing it up in the future :)

# Configuration

I didn't have time to build a backend, so this time I used [Firebase](https://firebase.google.com/) and [Algolia](https://www.algolia.com/) for the search function.
I used [MDB Angular](https://mdbootstrap.com/), an open-source UI library, because I had experience using it in the past.
I also use [Cypress](https://www.cypress.io/) for testing, and [Prettier](https://prettier.io/), [ESLint](https://eslint.org/) and [Stylelint](https://stylelint.io/) for formatting styles.

# Quick Start

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

## Generate environment configs

The `npm run config` command creates an environment configuration file for each development, qa, and production environment by generating credential information such as Firebase settings from `.env`. (`src/environments/environment.ts`, `src/scripts/config.js`,`src/scripts/serviceAccount.json`)
Please have the `.env` file shared by the administrator :)<br>
Note: The following `npm run start` includes this command, so you can skip this command. If you only want to create and check the configuration file, run this command please.

```bash
npm run config
```

## Start the server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

```bash
npm run start
```

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory.<br>
Run `npm run build:pro` to specify the build for the production configuration; Angular modules and components are to be compiled and optimized at build time. In the case of a production build, the configuration file will also be generated for production, so don't worry. :)

```bash
npm run build
npm run build:pro
```

## Documentation

For documentation purposes, I have written `docs.md` on each directory.

e.g.,

- https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/app/pages/docs.md
- https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/app/service/docs.md

## Testing

This application uses [Cypress](https://www.cypress.io/) for E2E testing. The test file are written in Typescript in the `cypress/e2e/` directory. (`cypress/e2e/signup.spec.cy.ts`)

```bash
npm run e2e
```

## Formatting

General style issues are automatically formatted at file save time using `Prettier`, a VSCode extension (`.vscode/settings.json`).
Lint and format by `ESLint` for `TypeScript` and `StyleLint` for `SCSS`. Their rules that conflict with `Prettier` is disabled.

```bash
npm run eslint
```

## Overall directory structure

<pre>
.
├── cypress
├── dist
└── <a href="https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/docs.md" target="_blank" rel="noopener noreferrer">src</a>
    ├── <a href="https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/app/docs.md" target="_blank" rel="noopener noreferrer">app</a>
    │   ├── <a href="https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/app/components/doc.md" target="_blank" rel="noopener noreferrer">components</a>
    │   │   ├── cart-product-card
    │   │   ├── cart-summary-btn
    │   │   ├── common-footer
    │   │   ├── common-header
    │   │   ├── product-card
    │   │   └── toasts
    │   │   └── add-cart-toast
    │   ├── <a href="https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/app/extra/docs.md" target="_blank" rel="noopener noreferrer">extra</a>
    │   ├── <a href="https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/app/pages/docs.md" target="_blank" rel="noopener noreferrer">pages</a>
    │   │   ├── login
    │   │   ├── maintenance
    │   │   ├── mypage
    │   │   │   ├── favorite
    │   │   │   ├── mypage
    │   │   │   └── pastitem
    │   │   ├── order
    │   │   │   ├── cart
    │   │   │   ├── confirm-cart-clear-modal
    │   │   │   └── confirm-order-modal
    │   │   ├── page-not-found
    │   │   ├── product
    │   │   │   ├── product-detail
    │   │   │   └── product-list
    │   │   ├── search
    │   │   ├── shop-guide
    │   │   ├── shop-top
    │   │   └── signup
    │   └── <a href="https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/app/service/docs.md" target="_blank" rel="noopener noreferrer">service</a>
    │       ├── domains
    │       └── utilities
    ├── <a href="https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/assets/docs.md" target="_blank" rel="noopener noreferrer">assets</a>
    │   └── product
    │       ├── master
    │       └── small
    ├── <a href="https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/backend/docs.md" target="_blank" rel="noopener noreferrer">backend</a>
    │   ├── dto
    │   ├── enums
    │   └── services
    ├── <a href="https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/environments/docs.md" target="_blank" rel="noopener noreferrer">environments</a>
    ├── <a href="https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/sass/docs.md" target="_blank" rel="noopener noreferrer">sass</a>
    ├── <a href="https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/scripts/docs.md" target="_blank" rel="noopener noreferrer">scripts</a>
    └── <a href="https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/shared/services/docs.md" target="_blank" rel="noopener noreferrer">shared</a>
        └── services
</pre>

