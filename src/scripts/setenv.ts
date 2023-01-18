/**
 * Reads the command line arguments passed in using `yargs`. You can access environment variables in `process.env` with `dotenv`,
 * and write the contents of the environment variable settings to a file for each environment with `writeFile`.
  - For development: `ts-node ./src/scripts/setenv.ts --environment=dev`
  - For qa: `ts-node . /src/scripts/setenv.ts --environment=qa`
  - For production: `ts-node . /src/scripts/setenv.ts --environment=prod`
 */
const { writeFile } = require('fs');
const { argv } = require('yargs');
require('dotenv').config();

// read the command line arguments
const environment = argv.environment;
const isProduction = environment === 'prod';
const isDev = environment === 'dev';

console.log(`🌟set environment configuration ========`);
console.log(`environment: ${environment}`);
console.log(`isProduction: ${isProduction}`);
console.log(`isDev: ${isDev}`);

const targetEnvPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : isDev
  ? `./src/environments/environment.ts`
  : `./src/environments/environment.qa.ts`;

const targetFirebaseConfigJsPath = `./src/scripts/config.js`;
const targetServiceAccountPath = `./src/scripts/serviceAccount.json`;

// JSON.stringify takes this string and outputs it as valid JSON for that value without converting any escaped characters in it.
const privateKeyString = JSON.stringify(process.env['FIREBASE_PRIVATE_KEY']);

// we have access to our environment variables in the process.env object using dotenv
const environmentFileContent = `export const environment = {
   production: ${isProduction},
   remote: ${!isDev},
   firebase: {
      projectId: "${process.env['FIREBASE_PROJECT_ID']}",
      appId: "${process.env['FIREBASE_APP_ID']}",
      storageBucket: "${process.env['FIREBASE_STORAGE_BUCKET']}",
      apiKey: "${process.env['FIREBASE_API_KEY']}",
      authDomain: "${process.env['FIREBASE_AUTH_DOMAIN']}",
      databaseURL: "${process.env['FIREBASE_DATABASE_URL']}",
      messagingSenderId: "${process.env['FIREBASE_MESSAGING_SENDER_ID']}",
      measurementId: "${process.env['FIREBASE_MEASUREMENT_ID']}"
   }
};
`;

const firebaseConfigJsFileContent = `const firebaseConfig = {
  projectId: "${process.env['FIREBASE_PROJECT_ID']}",
  appId: "${process.env['FIREBASE_APP_ID']}",
  storageBucket: "${process.env['FIREBASE_STORAGE_BUCKET']}",
  apiKey: "${process.env['FIREBASE_API_KEY']}",
  authDomain: "${process.env['FIREBASE_AUTH_DOMAIN']}",
  databaseURL: "${process.env['FIREBASE_DATABASE_URL']}",
  messagingSenderId: "${process.env['FIREBASE_MESSAGING_SENDER_ID']}",
  measurementId: "${process.env['FIREBASE_MEASUREMENT_ID']}"
};
module.exports = firebaseConfig;
`;

const serviceAccountFileContent = `{
  "type": "service_account",
  "project_id": "${process.env['FIREBASE_PROJECT_ID']}",
  "private_key_id": "${process.env['FIREBASE_PRIVATE_KEY_ID']}",
  "private_key": ${privateKeyString},
  "client_email": "${process.env['FIREBASE_CLIENT_EMAIL']}",
  "client_id": "${process.env['FIREBASE_CLIENT_ID']}",
  "auth_uri": "${process.env['FIREBASE_AUTH_URI']}",
  "token_uri": "${process.env['FIREBASE_TOKEN_URI']}",
  "auth_provider_x509_cert_url": "${process.env['FIREBASE_AUTH_PROVIDER_X509_CERT_URL']}",
  "client_x509_cert_url": "${process.env['CLIENT_X509_CERT_URL']}"
}
`;

// write the environmentFile content to the respective file
writeFile(targetEnvPath, environmentFileContent, function (err: Error) {
  if (err) {
    console.log(err);
  }
  console.log(`1: Completed towrite variables to ${targetEnvPath}`);
});

// write the targetFirebaseConfig content to the respective file
writeFile(
  targetFirebaseConfigJsPath,
  firebaseConfigJsFileContent,
  function (err: Error) {
    if (err) {
      console.log(err);
    }
    console.log(
      `2: Completed to write variables to ${targetFirebaseConfigJsPath}`
    );
  }
);

// write the targetServiceAccount content to the respective file
writeFile(
  targetServiceAccountPath,
  serviceAccountFileContent,
  function (err: Error) {
    if (err) {
      console.log(err);
    }
    console.log(
      `3: Completed to write variables to ${targetServiceAccountPath}`
    );

    console.log(`Environment configurations were successfully written :)`);
  }
);
