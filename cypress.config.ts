/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from 'cypress';
const { lighthouse, prepareAudit } = require('@cypress-audit/lighthouse');
const { pa11y } = require('@cypress-audit/pa11y');
const fs = require('fs');

export default defineConfig({
  projectId: 'fn1g6y',
  defaultCommandTimeout: 100000,
  viewportWidth: 414,
  viewportHeight: 846,
  // The setupNodeEvents function (or deprecated plugins file function) receives 2 arguments: on and config. It can return a synchronous value or can also return a Promise, which will be awaited until it resolves.
  // This enables you to perform asynchronous actions such as reading files in from the filesystem.
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // on is a function that you will use to register listeners on various events that Cypress exposes.
      on('before:browser:launch', (browser = {}, launchOptions) => {
        prepareAudit(launchOptions);
      });

      on('task', {
        // call the function in the @cypress-audit
        lighthouse: lighthouse((lighthouseReport: any) => {
          console.log('---- Writing lighthouse report to disk ----');
          // call the function in the @cypress-audit
          console.log(lighthouseReport); // raw lighthouse reports
          fs.writeFile(
            'lighthouse.html',
            lighthouseReport.report,
            (error: any) => {
              error
                ? console.log(error)
                : console.log('Report created successfully');
            }
          );
        }),
        pa11y: pa11y(console.log.bind(console)),
      });
    },
  },
});
