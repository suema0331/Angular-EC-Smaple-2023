# SampleAngularApp2023

This is a practical sample of an e-commerce application using Angular(version 15.0.5.). I hope you will have fun with this application. I implemented it using my past experience and the requests I received from customers to improve it.
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

```
.
├── cypress
├── dist
└── [src](https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/docs.md)
    ├── [app](https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/app/docs.md)
    │   ├── [components](https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/app/components/doc.md)
    │   │   ├── cart-product-card
    │   │   ├── cart-summary-btn
    │   │   ├── common-footer
    │   │   ├── common-header
    │   │   ├── product-card
    │   │   └── toasts
    │   │   └── add-cart-toast
    │   ├── [extra](https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/app/extra/docs.md)
    │   ├── [pages](https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/app/pages/docs.md)
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
    │   └── [service](https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/app/service/docs.md)
    │       ├── domains
    │       └── utilities
    ├── [assets](https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/assets/docs.md)
    │   └── product
    │       ├── master
    │       └── small
    ├── [backend](https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/backend/docs.md)
    │   ├── dto
    │   ├── enums
    │   └── services
    ├── [environments](https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/environments/docs.md)
    ├── [sass](https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/sass/docs.md)
    ├── [scripts](https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/scripts/docs.md)
    └── [shared](https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/shared/services/docs.md)
        └── services
```

- https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/docs.md
- https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/app/docs.md
- https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/app/components/doc.md
- https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/app/extra/docs.md
- https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/app/pages/docs.md
- https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/app/service/docs.md
- https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/assets/docs.md
- https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/backend/docs.md
- https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/environments/docs.md
- https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/sass/docs.md
- https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/shared/services/docs.md
- https://github.com/suema0331/Angular-EC-Smaple-2023/blob/master/src/scripts/docs.md
