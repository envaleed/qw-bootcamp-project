const Page = require('./page');
const productsData = require('../data/products.data');

class ProductPage extends Page {
  /**
   * define selectors using getter methods
   */
  get addToCartButton() {
    return $('button[data-item-id="quality-hat-model"]');
  }

  get itemQuantity() {
    return $('[inputmode="decimal"]');
  }

  get slideItem1() {
    return $('.thumb[aria-label="slide item 1"]');
  }

  get slideItem2() {
    return $('.thumb[aria-label="slide item 2"]');
  }

  get carouselDot1() {
    return $('.dot[aria-label="slide item 1"]');
  }

  get carouselDot2() {
    return $('.dot[aria-label="slide item 2"]');
  }

  get selectedSlide() {
    return $('.slide.selected');
  }

  get selectedSlideText() {
    return $('.slide.selected p');
  }

  async addItemToCart() {
    await this.addToCartButton.waitForClickable();
    await this.addToCartButton.click();
  }

  open() {
    return super.open('/products/quality-hat-model');
  }
}

module.exports = new ProductPage();
