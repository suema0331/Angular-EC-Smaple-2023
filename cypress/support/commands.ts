/// <reference types="cypress" />

Cypress.Commands.add('loginByCsrf', (username, password) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:4200/api/auth/login',
    body: {
      auth_code: 'testuser3@example.com:test1234!!!',
    },
    headers: {
      authorization: 'Basic testtesttesttesttesttesttest',
    }
  });
  return cy;
});

Cypress.Commands.add('login', (username, password) => {
  cy.visit('http://localhost:4200/login?return=%2Fshop-top');
  console.log(cy.url());
  cy.get('input[id=form_email]').clear().type(username)
    .should('have.value', username);
  cy.get('input[id=form_password]').clear().type(password)
    .should('have.value', password);
  cy.get('[data-test="login-btn"]').click();
  return cy;
});

Cypress.Commands.add('signup', (username, password, confirmPassword) => {
  cy.visit('http://localhost:4200/signup');
  console.log(cy.url());
  cy.get('input[id=form_email]').clear().type(username)
    .should('have.value', username);
  cy.get('input[id=form_password]').clear().type(password)
    .should('have.value', password);
  cy.get('input[id=form_confirm_password]').clear().type(confirmPassword)
    .should('have.value', confirmPassword);
  cy.get('input[id=form_confirm_policy]').check()

  cy.get('[data-test="signup-btn"]').click();
  return cy;
});

Cypress.Commands.add('validateSignupForm', (username, password, confirmPassword) => {
  cy.visit('http://localhost:4200/signup');
  console.log(cy.url());
  cy.get('input[id=form_email]').clear().type(username)
    .should('have.value', username);
  cy.get('input[id=form_password]').clear().type(password)
    .should('have.value', password);
  cy.get('input[id=form_confirm_password]').clear().type(confirmPassword)
    .should('have.value', confirmPassword);
  cy.get('input[id=form_confirm_policy]').check()

  return cy;
});
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
