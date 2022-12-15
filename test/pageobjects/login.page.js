const Page = require('./page');
const authData = require('../data/auth.data');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputEmailAddress() {
    return $('[name="email"]');
  }

  get inputPassword() {
    return $('[name="password"]');
  }

  get btnSubmit() {
    return $('button[type="submit"]');
  }

  get signUpModalTab() {
    return $("//a[text()='Sign Up']");
  }

  get signInOrRegisterCTA() {
    return $('#signInOrRegister');
  }

  get googleAuthButton() {
    return $('.auth0-lock-social-button-text');
  }

  get nextButton() {
    return $("//span[text()='Next']");
  }

  get googleEmailField() {
    return $('input[type="email"]');
  }

  get googlePasswordField() {
    return $('input[type="password"]');
  }

  get authError() {
    return $$('.auth0-lock-error-invalid-hint');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  async signUp(emailAddress, password) {
    await this.signInOrRegisterCTA.click();
    await this.signUpModalTab.waitForClickable();
    await this.signUpModalTab.click();
    await this.inputEmailAddress.setValue(emailAddress);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  async signIn(emailAddress, password) {
    await this.signInOrRegisterCTA.click();
    await this.inputEmailAddress.waitForClickable();
    await this.inputEmailAddress.setValue(emailAddress);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  async falseSignIn() {
    await this.signInOrRegisterCTA.click();
    await this.btnSubmit.waitForClickable();
    await this.btnSubmit.click();
  }

  async googleSignUp() {
    await this.signInOrRegisterCTA.click();
    await this.signUpModalTab.waitForClickable();
    await this.signUpModalTab.click();
    await this.googleAuthButton.click();
    await this.googleEmailField.setValue(authData.googleAccount.email);
    await this.nextButton.click();
    await this.googlePasswordField.waitForClickable();
    await this.googlePasswordField.setValue(authData.googleAccount.password);
    await this.nextButton.click();
  }

  async googleSignIn() {
    await this.signInOrRegisterCTA.click();
    await this.googleAuthButton.waitForClickable();
    await this.googleAuthButton.click();
    await this.googleEmailField.setValue(authData.googleAccount.email);
    await this.nextButton.click();
    await this.googlePasswordField.waitForClickable();
    await this.googlePasswordField.setValue(authData.googleAccount.password);
    await this.nextButton.click();
  }

  /**
   * overwrite specific options to adapt it to page object
   */
  open() {
    return super.open('/');
  }
}

module.exports = new LoginPage();
