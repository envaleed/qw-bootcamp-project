const Page = require('./page');

class CheckoutPage extends Page {
  get submitButton() {
    return $('button[type="submit"]');
  }

  get fullName() {
    return $('[name="name"]');
  }

  get email() {
    return $('[name="email"]');
  }

  get streetAddress() {
    return $('.snipcart-form__address-autocomplete > .snipcart-form__select');
  }

  get address2() {
    return $('[name="address2"]');
  }

  get city() {
    return $('[name="city"]');
  }

  get country() {
    return $('//label[text()="Country"]/following::div[6]/input');
  }

  get province() {
    return $('//label[text()="Province/State"]/following::div[6]/input');
  }

  get postalCode() {
    return $('[name="postalCode"]');
  }

  get formErrors() {
    return $$('.snipcart-field-error');
  }

  get paymentFrame() {
    return $('.snipcart-payment-card-form iframe');
  }

  get cardField() {
    return $('[name="card-number"]');
  }

  get expiryDate() {
    return $('[name="expiry-date"]');
  }

  get cvvField() {
    return $('[name="cvv"]');
  }

  get customerInformation() {
    return $('.snipcart-billing-completed__information');
  }

  async enterPayment() {
    await this.cardField.waitForClickable({ timeout: 30000 });
    await this.cardField.setValue('4242424242424242');
    await this.expiryDate.setValue('1230');
    await this.cvvField.setValue('123');
    await browser.switchToFrame(null);
    await this.submitButton.click();
  }

  async fillOutForm(fullName, email, city, province, postalCode) {
    await this.fullName.setValue(fullName);
    await this.email.setValue(email);
    await this.city.setValue(city);
    await this.country.setValue('United States');
    await browser.keys('\uE007');
    await this.province.setValue(province);
    await browser.keys('\uE007');
    await this.postalCode.setValue(postalCode);
    await this.submitButton.click();
  }

  open() {
    return super.open('/products#/checkout');
  }
}

module.exports = new CheckoutPage();
