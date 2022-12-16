const LoginPage = require('../pageobjects/login.page');
const ContactPage = require('../pageobjects/contact.page');
const strings = require('../data/strings.data');
const auth = require('../data/auth.data');
const { faker } = require('@faker-js/faker');

describe('Contact', () => {
  before(async function () {
    /* Sign in With data-driven 
    email address and password
    */
    await LoginPage.open();
    await LoginPage.signIn(
      auth.googleAccount.email,
      auth.googleAccount.password
    );
    await ContactPage.open();
  });

  it('verify form error on submission', async () => {
    /* Submit empty form and check for errors messages (DATA DRIVEN TEST)
     */
    await ContactPage.sendMessageButton.click();
    const errors = await ContactPage.errorMessages;
    for (const error of errors) {
      await expect(error).toHaveTextContaining(strings.contact_error_message_1);
    }
  });

  it('verify email address error', async () => {
    /* Submit form with incorrect email address then check for the error message
    (DATA DRIVEN TEST)
     */
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.random.word();
    const subject = faker.random.words(5);
    const message = faker.lorem.paragraphs(5);
    await ContactPage.fillContactForm(
      firstName,
      lastName,
      email,
      subject,
      message
    );
    await expect(ContactPage.errorMessages).toHaveTextContaining(
      strings.contact_error_message_2
    );
  });

  it('verify navigation to related item', async () => {
    /* Use the faker library to call the fillContactForm method with data then assert that the toast is shown
    (DATA DRIVEN TEST)
     */
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const subject = faker.random.words(5);
    const message = faker.lorem.paragraphs(5);
    await ContactPage.fillContactForm(
      firstName,
      lastName,
      email,
      subject,
      message
    );
    await ContactPage.toastTitle.waitForDisplayed();
    await expect(ContactPage.toastTitle).toHaveTextContaining(
      strings.message_confirmation
    );
  });
});
