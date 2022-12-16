const Page = require('./page');

class CartPage extends Page {
  /**
   * define selectors using getter methods
   */
  get singleAddToCartButton() {
    return $('[data-item-id="quality-hat-model"]');
  }

  get emptyCartTitle() {
    return $('.snipcart-empty-cart__title');
  }

  get addToCartButton() {
    return $$('.chakra-button#add-to-cart');
  }

  get singleItemQuantity() {
    return $('[inputmode="decimal"]');
  }

  get cartItemName() {
    return $('.snipcart-item-line__title');
  }

  get cartItemNames() {
    return $$('.snipcart-item-line__title');
  }

  get cartItemPrice() {
    return $('.snipcart-item-quantity__total-price');
  }

  get cartItemPrices() {
    return $$('.snipcart-item-quantity__total-price');
  }

  get viewDetailedCartLink() {
    return $('.snipcart-button-link');
  }

  get cartItemQuantity() {
    return $('.snipcart-item-quantity__quantity span');
  }

  get removeCartItemButton() {
    return $('button[title="Remove item"]');
  }

  get closeCartButton() {
    return $('button [title="Remove item"]');
  }

  /**
   * add a single item to cart
   */

  async addSingleItemToCart() {
    await this.singleAddToCartButton.waitForDisplayed({ timeout: 60000 });
    await this.singleAddToCartButton.click();
  }

  /**
   * add 2 items to cart
   */

  async addMultipleItemsToCart() {
    const items = await this.addToCartButton;
    for (let i = 0; i < 2; i++) {
      await items[i].waitForClickable({ timeout: 60000 });
      await items[i].click();
      await items[i].waitForClickable({ timeout: 60000 });
      await items[i].click();
    }
  }

  open() {
    return super.open('/products');
  }
}

module.exports = new CartPage();
