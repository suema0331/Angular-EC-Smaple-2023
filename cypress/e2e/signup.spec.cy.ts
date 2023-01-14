describe('The Signup Page', () => {

  it('should fill the signup form and redirect to shop top page', () => {

    cy.fixture('user.json').then(loginInfo => {
      // Success
      cy.signup(loginInfo.username, loginInfo.password, loginInfo.password);
      // we should be redirected to the store top
      cy.url().should('include', 'shop-top');

      // UI should reflect this user being logged in
      cy.get('.top-header > ._logo-area > ._name').should('contain', 'Sample EC');
      cy.get('.top-header > ._logout').should('contain', 'logout');

      // Go to my page and confirm the user infomation
      cy.get('.top-header > ._menu').first().click();
      // we should be redirected to the mypage
      cy.url().should('include', '/mypage');

      // confirm the user infomation
      cy.get('.mypage-header > ._ttl').should('contain', 'My Page');
      cy.get('.mypage-header ._button-area' ).should('contain', 'logout');
      cy.get('.mypage> .account-area > ._right > ._name' ).should('contain', 'testuser');

    });
  });

  it('should fill the signup form  and occur error', () => {

    /** CASE1
     * - Email address does not contain @.
     * - Password is shorter than 10 characters and contains no uppercase letters, numbers or symbols.
     * - Confirmation password does not match.
     *  */
    cy.validateSignupForm('a', 'b', 'c');
    cy.get('[data-test="signup-mail-error"]').should('contain', 'Incorrect email address');
    cy.get('[data-test="signup-password-error2"]').should('contain', 'Please enter more than 10 characters.');
    cy.get('[data-test="signup-password-error3"]').should('contain', 'Please include: Upper case/Number/Symbol in the list');
    cy.get('[data-test="signup-confirm-password-error"]').should('contain', 'Password does not match.');

    /** CASE2
     * - Email address is longer than 50 characters.
     * - Password does not contain numbers and symbols, contains symbols other than the allowed symbols.
     * - Confirmation password does not match.
     *  */
    cy.validateSignupForm('Loremipsumdolorsitamet@cconsecteturaadipisicinnnnnn', 'Lorem ipsu', 'c');
    cy.get('[data-test="signup-mail-error"]').should('contain', 'Please enter up to 50 characters.');
    cy.get('[data-test="signup-password-error3"]').should('contain', 'Please include: Number/Symbol in the list');
    cy.get('[data-test="signup-password-error4"]').should('contain', 'Unavailable characters are included, Please delete them.');
    cy.get('[data-test="signup-confirm-password-error"]').should('contain', 'Password does not match.');

    /** CASE3
     * - Email address is good.
     * - Password is longer than 20 characters, and is the same as the email address
     * - Confirmation password does not match.
     *  */
    cy.validateSignupForm('testUser1@example.com', 'testUser1@example.com', 'testUser');
    cy.get('[data-test="signup-password-error2"]').should('contain', 'Please enter up to 20 characters.');
    cy.get('[data-test="signup-password-error5"]').should('contain', 'Please set a different one than your e-mail address.');
    cy.get('[data-test="signup-confirm-password-error"]').should('contain', 'Password does not match.');

    /** CASE4
     * - Email address is good.
     * - Password contains part of the email address
     * - Confirmation password does not match.
     *  */
    cy.validateSignupForm('testUser1@example.com', 'testUser1', 'testUser');
    cy.get('[data-test="signup-password-error5"]').should('contain', 'Cannot contain part of an email address.');
    cy.get('[data-test="signup-confirm-password-error"]').should('contain', 'Password does not match.');

    /** CASE4
     * - Email address is good.
     * - Password is good.
     * - Confirmation password is good.
     * - Agreement checkbox not checked.
     *  */
    cy.validateSignupForm('testUser1@example.com', 'testUser2!!!', 'testUser2!!!');
    cy.get('input[id=form_confirm_policy]').uncheck({force: true})
    cy.get('[data-test="signup-btn"]').click();
    cy.get('[data-test="signup-agreement-error"]').should('contain', '*Your consent is required. Please check the box');
  });
});
