const LoginPage = require('../pageobjects/login.page');
const { faker } = require('@faker-js/faker');
const authData = require('../data/auth.data');
const urls = require('../data/urls.data');

describe('Authentication', () => {
  beforeEach(async function () {
    /* Open the root url */
    await LoginPage.open();
  });

  afterEach(async function () {
    /* Since the method of authentication is session based, we must kill the
    session to log out the user */
    await browser.reloadSession();
  });

  it('verify navigation to login screen', async () => {
    /* Check that the button navigates to the login screen*/
    await $(LoginPage.signInOrRegisterCTA).click();
    await expect(browser).toHaveUrlContaining(urls.auth_route);
  });

  it('verify sign up', async () => {
    //create a data-driven user
    const emailAddress = faker.internet.email();
    const password = faker.internet.password(12, false, /\w/, '!Aa0');

    //open in the sign up page and enter the credentials
    await LoginPage.open();
    await LoginPage.signUp(emailAddress, password);
    await expect(browser).toHaveUrlContaining(urls.overview_page_route);
  });

  it('verify google auth signup', async () => {
    /* Authenticate with google then check if the user is redirected to 
    the product home page */
    await LoginPage.googleSignUp();
    await expect(browser).toHaveUrlContaining(urls.overview_page_route);
  });

  it('verify google auth login', async () => {
    /* Authenticate with google then check if the user is redirected to 
    the product home page */
    await LoginPage.googleSignIn();
    await expect(browser).toHaveUrlContaining(urls.overview_page_route);
  });

  it('verify form errors on empty submission', async () => {
    /* Submit the empty form then check to see that each error displayed
    is correct (DATA DRIVEN TEST) */
    await LoginPage.falseSignIn();
    const errors = await LoginPage.authError;
    for (const error of errors) {
      await expect(error).toHaveTextContaining([
        authData.errorMessages.emailError,
        authData.errorMessages.passwordError,
      ]);
    }
  });
});
