const Page = require('./page');
const productsData = require('../data/products.data');

class ProductsPage extends Page {
  /**
   * define selectors using getter methods
   */

  get productCategories() {
    return $$('.chakra-stack span.css-1ccau2i');
  }

  get productNames() {
    return $$('.css-12qzrsi .chakra-text.css-1n64n71');
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

  get search() {
    return $('#search');
  }

  get itemGallery() {
    return $('.css-12qzrsi');
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
