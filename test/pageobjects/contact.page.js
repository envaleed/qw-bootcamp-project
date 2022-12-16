const Page = require('./page');

class ContactPage extends Page {
  get firstName() {
    return $('[name="firstName"]');
  }
  get lastName() {
    return $('[name="lastName"]');
  }
  get email() {
    return $('[name="email"]');
  }
  get subject() {
    return $('[name="subject"]');
  }
  get message() {
    return $('[name="message"]');
  }
  get sendMessageButton() {
    return $('//button[text()="Send Message"]');
  }
  get errorMessages() {
    return $$('.chakra-form__error-message');
  }

  get toastTitle() {
    return $('.chakra-alert__title');
  }

  async fillContactForm(firstName, lastName, email, subject, message) {
    await this.firstName.setValue(firstName);
    await this.lastName.setValue(lastName);
    await this.email.setValue(email);
    await this.subject.setValue(subject);
    await this.message.setValue(message);
    await this.sendMessageButton.click();
  }

  open() {
    return super.open('/contact');
  }
}

module.exports = new ContactPage();
