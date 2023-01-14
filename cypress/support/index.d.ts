// tslint:disable-next-line:no-namespace
declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * UIを通じてログインする
     */
    login(email: string, password: string): Chainable<any>;
    /**
     * 直接APIを叩いてログインする
     */
    loginByCsrf(email: string, password: string): Chainable<any>;
    /**
     * UIを通じてSignupする
     */
    signup(email: string, password: string, confirmPassword: string): Chainable<any>;
    validateSignupForm(email: string, password: string, confirmPassword: string): Chainable<any>;
  }
}
