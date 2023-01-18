# src/scripts

- `import-datal.js`: Data input tool for development. Since it was hard to manually input all of the fields in the firebase console, I implemented a tool to register the entire object at once. In this example, `import-datal.js` read `./data/products.json` and registers the products to the `products` collection in firebase.

- `setenv.ts`: This script creates an environment configuration file for each development, qa, and production environment by generating credential information such as Firebase settings from .env. (`src/environments/environment.ts`, `src/scripts/config.js`,`src/scripts/serviceAccount.json`). Please have the .env file shared by the administrator :)
  In this script, Reads the command line arguments passed in using `yargs`. You can access environment variables in `process.env` with `dotenv`, and write the contents of the environment variable settings to a file for each environment with `writeFile`.
  - For development: `ts-node ./src/scripts/setenv.ts --environment=dev`
  - For qa: `ts-node . /src/scripts/setenv.ts --environment=qa`
  - For production: `ts-node . /src/scripts/setenv.ts --environment=prod`
