const LoginPage = require('../pageobjects/login.page');
const strings = require('../data/strings.data');
const auth = require('../data/auth.data');
const ProductsPage = require('../pageobjects/products.page');
const CheckoutPage = require('../pageobjects/checkout.page');
const urlsData = require('../data/urls.data');
const { faker } = require('@faker-js/faker');

describe('Checkout', () => {
  before(async function () {
    /* Sign in With data-driven 
    email address and password, add item
    to cart
    and navigate to checkout page
    */
    await LoginPage.open();
    await LoginPage.signIn(
      auth.googleAccount.email,
      auth.googleAccount.password
    );
    await ProductsPage.addItemToCart();
    await ProductsPage.checkoutButton.click();
  });

  it('verify form errors', async () => {
    /*
    Submit empty form and check the errors that show up
     */
    await CheckoutPage.submitButton.waitForClickable();
    await CheckoutPage.submitButton.click();
    const errors = await CheckoutPage.formErrors;
    for (const error of errors) {
      await expect(error).toHaveTextContaining(strings.checkout_form_error);
    }
  });

  it('verify successful checkout', async () => {
    /*
    Perform a full checkout by using data from the faker library
    to fill out the form then fill the payment form
    and submit. Check to see if the user sees the receipt afterwards
     */
    const fullName = faker.name.fullName();
    const email = faker.internet.email();
    const city = faker.address.city();
    const province = faker.address.state();
    const postalCode = faker.address.zipCode();
    await CheckoutPage.fillOutForm(fullName, email, city, province, postalCode);
    await CheckoutPage.paymentFrame.waitForDisplayed({ timeout: 30000 });
    const frame = await CheckoutPage.paymentFrame;
    await browser.switchToFrame(frame);
    await CheckoutPage.enterPayment();
    await expect(browser).toHaveUrlContaining(urlsData.receipt_url);
  });

  it('verify customer information on receipt', async () => {
    /*
    After the user performs a successful checkout, check to see that
    their email and name are shown (DATA DRIVEN TEST)
     */
    await ProductsPage.open();
    await ProductsPage.addItemToCart();
    await ProductsPage.checkoutButton.click();
    const fullName = faker.name.fullName();
    const email = faker.internet.email();
    const city = faker.address.city();
    const province = faker.address.state();
    const postalCode = faker.address.zipCode();
    await CheckoutPage.fillOutForm(fullName, email, city, province, postalCode);
    await CheckoutPage.paymentFrame.waitForDisplayed({ timeout: 30000 });
    const frame = await CheckoutPage.paymentFrame;
    await browser.switchToFrame(frame);
    await CheckoutPage.enterPayment();
    await expect(CheckoutPage.customerInformation).toHaveTextContaining(
      fullName
    );
    await expect(CheckoutPage.customerInformation).toHaveTextContaining(email);
  });
});
