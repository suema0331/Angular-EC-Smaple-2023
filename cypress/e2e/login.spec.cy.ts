describe('The Login Page', () => {

  it('should fill the login form and redirect to shop top page', () => {

    cy.fixture('user.json').then(loginInfo => {
      console.log(loginInfo);
      cy.login(loginInfo.username, loginInfo.password);

      // We should be redirected to the store top
      cy.url().should('include', 'shop-top');

      // Our auth token should be present
      // cy.url().should('include', '/shop-top', () => {
      //   expect(localStorage.getItem('current_token')).to.be.a('string');
      //   console.log(localStorage.getItem('current_token'));
      // });

      // UI should reflect this user being logged in
      cy.get('.top-header > ._logo-area > ._name').should('contain', 'Sample EC');

      cy.get('.top-header > ._logout').should('contain', 'logout');

      // Go to my page and confirm the user infomation
      cy.get('.top-header > ._menu').first().click();
      // We should be redirected to the mypage
      cy.url().should('include', '/mypage');

      // Confirm the user infomation
      cy.get('.mypage-header > ._ttl').should('contain', 'My Page');
      cy.get('.mypage-header ._button-area' ).should('contain', 'logout');
      cy.get('.mypage> .account-area > ._right > ._name' ).should('contain', 'testuser');

    });
  });

  // it('should call the login API redirect to shop top page', () => {
  //   cy.fixture('user.json').then(loginInfo => {
  //     cy.loginByCsrf(loginInfo.username, loginInfo.password);
  //   });
  // });
});
