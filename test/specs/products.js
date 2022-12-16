const LoginPage = require('../pageobjects/login.page');
const urls = require('../data/urls.data');
const ProductsPage = require('../pageobjects/products.page');
const strings = require('../data/strings.data');
const auth = require('../data/auth.data');

describe('Product Gallery Home Page', () => {
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

  it('verify clicking image goes to product page', async () => {
    /* Wait until the product image is clickable then 
    click to navigate and assert the route is correct
    */
    await ProductsPage.productImage.waitForClickable({ timeout: 60000 });
    await ProductsPage.productImage.click();
    await expect(browser).toHaveUrlContaining(urls.product_route);
  });

  it('verify youtube video title', async () => {
    /* Focus the iFrame and
    assert that the title string is correct
    */
    await ProductsPage.open();
    const youtubeFrame = await ProductsPage.youtubeVideoFrame;
    const youtubeTitle = await ProductsPage.youtubeVideoTitle;
    await browser.switchToFrame(youtubeFrame);
    await expect(youtubeTitle).toHaveTextContaining(strings.video_title);
  });

  it('verify image changes on hover', async () => {
    /* Move the mouse to a product
    and check its src attribute to see
    if the image is correct
    */
    await ProductsPage.open();
    await browser.setWindowSize(1440, 900);
    await ProductsPage.productImage.scrollIntoView();
    await ProductsPage.productImage.moveTo();
    const futureImg = await ProductsPage.productImage.getAttribute('src');
    await expect(ProductsPage.productImage).toHaveAttributeContaining(
      'src',
      futureImg
    );
  });
});
