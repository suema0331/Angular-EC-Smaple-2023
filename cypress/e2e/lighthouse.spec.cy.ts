/// <reference types="@cypress-audit/lighthouse" />
/// <reference types="@cypress-audit/pa11y" />

describe('Lighthouse Testing', () => {

  beforeEach(() => {
    Cypress.config('taskTimeout', 180_00000)
    cy.viewport('iphone-8') //375px x 667px
    // cy.viewport('macbook-13') // 1280px x 800px
    cy.visit('http://localhost:4200/shop-top')
  });

  // Execute accessibility audit via pa11y
  // it('pa11y audits', () => {
  //     cy.pa11y();
  // });

  it("should verify the lighthouse scores with thresholds", function () {
      // Define custom thresholds for successful audit
      cy.lighthouse({
        performance: 20,
        accessibility: 70,
        "best-practices": 70,
        seo: 70,
        pwa: 50,
      },
        {
          /**
           * Screen/Viewport emulation and UserAgent string spoofing
           * With the default configuration, Lighthouse emulates a mobile device.
           */
          formFactor: "desktop",
          // formFactor: "mobile",
          screenEmulation: { // https://github.com/GoogleChrome/lighthouse/blob/main/docs/emulation.md
            mobile: false,
            disable: false,
            width: Cypress.config("viewportWidth"),
            height: Cypress.config("viewportHeight"),
            deviceScaleRatio: 1,
          },
          /**
           * Network and CPU throttling/simulation
           * By changing these parameters, performance can be tested under varying loads.
           *
           * With the default configuration, Lighthouse emulates operation on a smartphone by pseudo-slowing down the CPU and network when measuring the smartphone environment.
           * Since formFactor only changes Lighthouse's UserAgent, the network and CPU emulation default to values for smartphones.
           * To get the same values as Chrome's built-in Lighthouse Desktop, you need to change "throttling".
           */
          // desktop
          throttling: { // https://github.com/GoogleChrome/lighthouse/blob/main/docs/throttling.md
            rttMs: 40, // Controls simulated network RTT (TCP layer)
            throughputKbps: 11024, // Controls simulated network download throughput
            cpuSlowdownMultiplier: 1, // To change the slowdown multiplier e.g.,1
            requestLatencyMs: 0, // Controls emulated network RTT (HTTP layer)
            downloadThroughputKbps: 0, // Controls emulated network download throughput
            uploadThroughputKbps: 0, // Controls emulated network upload throughput
          },
          // mobile
          // throttling: {
          //   rttMs: 150, // Controls simulated network RTT (TCP layer)
          //   throughputKbps: 1638.4, // Controls simulated network download throughput
          //   cpuSlowdownMultiplier: 4, // To change the slowdown multiplier e.g.,1
          //   requestLatencyMs: 0, // Controls emulated network RTT (HTTP layer)
          //   downloadThroughputKbps: 0, // Controls emulated network download throughput
          //   uploadThroughputKbps: 0, // Controls emulated network upload throughput
          // },
        }
    );
  });
});
