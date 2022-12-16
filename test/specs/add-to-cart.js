const CartPage = require('../pageobjects/cart.page');
const LoginPage = require('../pageobjects/login.page');
const productsData = require('../data/products.data');
const ProductPage = require('../pageobjects/product.page');

describe('Add to Cart', () => {
  before(async function () {
    /* Authenticate the user before executing tests */
    await LoginPage.open();
    await LoginPage.googleSignIn();
  });

  it('verify add to cart from product page', async () => {
    /**
     * open the product page and add the first item
     * then assert that the price and name are correct then clear the cart
     */
    await ProductPage.open();
    await ProductPage.addItemToCart();
    await CartPage.cartItemName.waitForDisplayed();
    await expect(CartPage.cartItemName).toHaveTextContaining(
      productsData.products[0].name
    );
    await expect(CartPage.cartItemPrice).toHaveTextContaining(
      productsData.products[0].price
    );
    await CartPage.removeCartItemButton.click();
    await CartPage.closeCartButton.click();
  });

  it('verify add to cart from home page', async () => {
    /**
     * open the product page and add the first item
     * then assert that the price and name are correct then clear the cart
     */
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

  it('verify add multiple items to cart from home page', async () => {
    /**
     * open the product page and add two items to cart
     * then assert that the price and name are correct then clear the cart
     */
    await CartPage.open();
    await CartPage.addMultipleItemsToCart();
    const cartItemsList = await CartPage.cartItemNames;
    const itemList = productsData.products;
    for (let i = 0; i < 2; i++) {
      await expect(cartItemsList[i]).toHaveTextContaining([
        itemList[0].name,
        itemList[1].name,
      ]);
    }
    await CartPage.removeCartItemButton.click();
    await CartPage.closeCartButton.click();
  });
});
