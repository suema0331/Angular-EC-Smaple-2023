# src

I use Cypress for testing, and Prettier, ESLint and Stylelint for formatting styles.

- `proxy.conf.json`: Assume that when communicating with the backend in the future, there will be a web server and an Auth server, and multiple APIpaths.

- `.eslintrc.js`: Some things cannot be formatted with `ESLint` but can be formatted with `Prettier` (e.g. max-len). ESLint only formats what you set, but Prettier formats it nice by default. Use `eslint-config-prettier` to disable rules that conflict with Prettier

- `.prettierrc.json`: Use `Prettier` for code style issues and linter for code structure issues.

- `.stylelintrc.json`: `Stylelint` is officially written to be used with `Prettier`(https://prettier.io/docs/en/integrating-with-linters.html). Use `stylelint-config-prettier` to disable rules that conflict with `Prettier`.
