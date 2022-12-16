const CartPage = require('../pageobjects/cart.page');
const LoginPage = require('../pageobjects/login.page');
const productsData = require('../data/products.data');
const urls = require('../data/urls.data');

describe('Cart', () => {
  before(async function () {
    await LoginPage.open();
    await LoginPage.googleSignIn();
  });

  it('verify remove item from cart', async () => {
    await CartPage.open();
    await CartPage.addSingleItemToCart();
    await CartPage.cartItemName.waitForDisplayed();
    await CartPage.removeCartItemButton.click();
    await expect(CartPage.emptyCartTitle).toHaveTextContaining(
      'Your cart is empty.'
    );
    await CartPage.closeCartButton.click();
  });

  it('verify cart item', async () => {
    await CartPage.open();
    await CartPage.addSingleItemToCart();
    await expect(CartPage.cartItemName).toHaveTextContaining(
      productsData.products[0].name
    );
    await expect(CartPage.cartItemPrice).toHaveTextContaining(
      productsData.products[0].price
    );
    await CartPage.removeCartItemButton.click();
    await CartPage.closeCartButton.click();
  });

  it('verify navigation to detailed cart', async () => {
    await CartPage.open();
    await CartPage.addSingleItemToCart();
    await CartPage.viewDetailedCartLink.waitForDisplayed();
    await CartPage.viewDetailedCartLink.click();
    await expect(browser).toHaveUrlContaining(urls.cart_route);
  });
});
