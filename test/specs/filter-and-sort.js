const LoginPage = require('../pageobjects/login.page');
const strings = require('../data/strings.data');
const auth = require('../data/auth.data');
const ProductsPage = require('../pageobjects/products.page');
const productsData = require('../data/products.data');

describe('Filter and Sort', () => {
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

  it('verify low to high sort', async () => {
    /*
    Sort the data set in ascending order then apply the filter on the page.
    After that, check each item's prices on the page against the data set.
    (DATA DRIVEN TEST)
     */
    let productList = productsData.products;
    productList.sort((a, b) => a.price - b.price);
    await ProductsPage.sortFilter.waitForClickable({ timeout: 30000 });
    await ProductsPage.sortFilter.selectByAttribute(
      'value',
      strings.low_high_sort
    );
    let productPrices = await ProductsPage.itemPrices;
    for (let i = 0; i < productPrices.length; i++) {
      let dataPrice = productList[i].price.toString();
      await expect(productPrices[i]).toHaveTextContaining(dataPrice);
    }
  });

  it('verify filter', async () => {
    /*
    Select the shirt filter then iterate through to ensure only 
    shirts are displayed on the page
    (DATA DRIVEN TEST)
     */
    await ProductsPage.categoryFilter.selectByAttribute(
      'value',
      strings.shirt_filter
    );
    const categoryList = await ProductsPage.itemCategories;
    for (const category of categoryList) {
      await expect(category).toHaveTextContaining(strings.shirt_filter);
    }
  });

  it('verify filter reset', async () => {
    /*
    Click the reset filter button and check that all 22 items are displayed
    on the page
     */
    await ProductsPage.filterReset.click();
    const productsList = await ProductsPage.productNames;
    await expect(productsList).toBeElementsArrayOfSize(22);
  });
});
