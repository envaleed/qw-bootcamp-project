const Page = require('./page');
const productsData = require('../data/products.data');

class ProductsPage extends Page {
  /**
   * define selectors using getter methods
   */

  get productCategories() {
    return $$('.chakra-stack span.css-1ccau2i');
  }

  get productImage() {
    return $('#product-20 .chakra-aspect-ratio img');
  }

  get youtubeVideoFrame() {
    return $('iframe[title="Automate Your Quality Assurance Testing"]');
  }

  get youtubePlayButton() {
    return $('.ytp-large-play-button');
  }

  get youtubeVideoTitle() {
    return $('a.ytp-title-link');
  }

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
    return super.open('/products');
  }
}

module.exports = new ProductsPage();
