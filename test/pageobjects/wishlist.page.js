const Page = require('./page');

class WishlistPage extends Page {
  /**
   * define selectors using getter methods
   */

  get noFavoritesText() {
    return $('div.css-owjkmg .chakra-heading');
  }

  get noFavoritesIcon() {
    return $('div.css-owjkmg svg');
  }

  get noFavoritesSubText() {
    return $('div.css-owjkmg .chakra-text');
  }

  get itemText() {
    return $('p.css-1n64n71');
  }

  get removeButton() {
    return $('#remove-favorite-btn');
  }

  get addToCartButton() {
    return $('#add-to-cart');
  }

  async removeFavorite() {
    await this.removeButton.waitForClickable();
    await this.removeButton.click();
  }

  open() {
    return super.open('/favorites');
  }
}

module.exports = new WishlistPage();
