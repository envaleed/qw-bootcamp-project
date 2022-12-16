const LoginPage = require('../pageobjects/login.page');
const urls = require('../data/urls.data');
const strings = require('../data/strings.data');
const auth = require('../data/auth.data');
const { faker } = require('@faker-js/faker');
const ProductsPage = require('../pageobjects/products.page');

describe('Contact', () => {
  before(async function () {
    /* Sign in With data-driven 
    email address and password
    */
    await LoginPage.open();
    await LoginPage.signIn(
      auth.googleAccount.email,
      auth.googleAccount.password
    );
  });

  it('verify search with special chars fails', async () => {
    /* Search with special chars and check if no items render
     */
    await ProductsPage.search.setValue(strings.special_chars_search);
    await expect(ProductsPage.productImage).not.toBeDisplayed();
  });

  it('verify search with numbers fails', async () => {
    /* Search with number and check if no items render
     */
    await ProductsPage.search.setValue(strings.numbers_search);
    await expect(ProductsPage.productImage).not.toBeDisplayed();
  });

  it('verify valid search', async () => {
    /* Search with special chars and check if no items render
     */
    await ProductsPage.search.setValue(strings.valid_search);
    const filteredProducts = await ProductsPage.productNames;
    for (const filteredProduct of filteredProducts) {
      await expect(filteredProduct).toHaveTextContaining(strings.valid_search);
    }
  });
});
