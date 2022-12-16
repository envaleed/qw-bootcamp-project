const CartPage = require('../pageobjects/cart.page');
const LoginPage = require('../pageobjects/login.page');
const productsData = require('../data/products.data');
const urls = require('../data/urls.data');

describe('Cart', () => {
  before(async function () {
    /* Authentication */
    await LoginPage.open();
    await LoginPage.googleSignIn();
  });

  it('verify remove item from cart', async () => {
    /* Add item to cart then verify it was removed by
    checking if the empty cart text is shown */
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
    /* Verify in the cart that the item is correct by adding
    it first then checking the name and price */
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
    /* Add item to cart then check if the detailed cart opens
    when navigated to by clicking the link */
    await CartPage.open();
    await CartPage.addSingleItemToCart();
    await CartPage.viewDetailedCartLink.waitForDisplayed();
    await CartPage.viewDetailedCartLink.click();
    await expect(browser).toHaveUrlContaining(urls.cart_route);
  });
});
