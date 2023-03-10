const Page = require('./page');

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

  get selectedSlideImage() {
    return $('.slide.selected img');
  }

  get selectedSlideText() {
    return $('.slide.selected p');
  }

  get relatedProductImage() {
    return $('.chakra-aspect-ratio .chakra-image');
  }

  /**
   * add item to cart from the product home gallery page
   */

  async addItemToCart() {
    await this.addToCartButton.waitForClickable();
    await this.addToCartButton.click();
  }

  open() {
    return super.open('/products/quality-hat-model');
  }
}

module.exports = new ProductPage();
