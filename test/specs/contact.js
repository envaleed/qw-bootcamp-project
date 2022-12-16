const LoginPage = require('../pageobjects/login.page');
const urls = require('../data/urls.data');
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
    /* Click the carousel dot and use
    data-driven testing to assert against 
    the src attribute
    */
    await ContactPage.sendMessageButton.click();
    const errors = await ContactPage.errorMessages;
    for (const error of errors) {
      await expect(error).toHaveTextContaining(strings.contact_error_message_1);
    }
  });

  it('verify email address error', async () => {
    /* Click the slide thumbnail and use
    data-driven testing to assert against 
    the src attribute
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
    /* Click the related item and use
    data-driven testing to assert against 
    the browser url
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
