// tslint:disable-next-line:no-namespace
declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Log in through the UI
     */
    login(email: string, password: string): Chainable<any>;
    /**
     * Log in by calling the API directly
     */
    loginByCsrf(email: string, password: string): Chainable<any>;
    /**
     * Sign up through UI
     */
    signup(email: string, password: string, confirmPassword: string): Chainable<any>;
    validateSignupForm(email: string, password: string, confirmPassword: string): Chainable<any>;
  }
}
