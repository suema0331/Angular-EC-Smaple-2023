/// <reference types="@cypress-audit/lighthouse" />
/// <reference types="@cypress-audit/pa11y" />

describe('Lighthouse Testing', () => {

  beforeEach(() => {
    Cypress.config('taskTimeout', 180_00000)
    // cy.viewport('iphone-8') //ビューポートを375pxx667pxに設定
    cy.viewport('macbook-13') //ビューポートを1280pxx800pxに設定
    cy.visit('http://localhost:4200/shop-top')
  });

  // Execute accessibility audit via pa11y
  // it('pa11y audits', () => {
  //     cy.pa11y();
  // });

  it("should verify the lighthouse scores with thresholds", function () {
      // Define custom thresholds for successful audit
      cy.lighthouse({
        performance: 45,
        accessibility: 70,
        "best-practices": 70,
        seo: 70,
        pwa: 50,
      },
        {
          formFactor: "desktop", // mobile
          screenEmulation: {
            mobile: false,
            disable: false,
            width: Cypress.config("viewportWidth"),
            height: Cypress.config("viewportHeight"),
            deviceScaleRatio: 1,
          },
          // throttling: {
          //   rttMs: 40, // Controls simulated network RTT (TCP layer)
          //   throughputKbps: 11024, // Controls simulated network download throughput
          //   cpuSlowdownMultiplier: 0, // To change the slowdown multiplier e.g.,1
          //   requestLatencyMs: 0, // Controls emulated network RTT (HTTP layer)
          //   downloadThroughputKbps: 0, // Controls emulated network download throughput
          //   uploadThroughputKbps: 0, // Controls emulated network upload throughput
          // },
        }
    );
  });
});
