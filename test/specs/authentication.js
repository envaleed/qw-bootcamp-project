const LoginPage = require('../pageobjects/login.page');
const { faker } = require('@faker-js/faker');
const authData = require('../data/auth.data');

describe('Authentication', () => {
  beforeEach(async function () {
    await LoginPage.open();
  });

  afterEach(async function () {
    await browser.reloadSession();
  });

  it('verify navigation to login screen', async () => {
    await $('#signInOrRegister').click();
    await expect(browser).toHaveUrlContaining(
      'https://dev-mlluudmotpwoldtv.us.auth0.com/login'
    );
  });

  it('verify sign up', async () => {
    //create a data-driven user
    const emailAddress = faker.internet.email();
    const password = faker.internet.password(12, false, /\w/, '!Aa0');

    //open in the sign up page and enter the credentials
    await LoginPage.open();
    await LoginPage.signUp(emailAddress, password);
    await expect(browser).toHaveUrlContaining('/products');
  });

  it('verify google auth signup', async () => {
    await LoginPage.googleSignUp();
    await expect(browser).toHaveUrlContaining('/products');
  });

  it('verify google auth login', async () => {
    await LoginPage.googleSignIn();
    await expect(browser).toHaveUrlContaining('/products');
  });

  it('verify form errors on empty submission', async () => {
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
