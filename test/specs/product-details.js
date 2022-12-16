const LoginPage = require('../pageobjects/login.page');
const urls = require('../data/urls.data');
const ProductPage = require('../pageobjects/product.page');
const auth = require('../data/auth.data');

describe('Product Details', () => {
  before(async function () {
    /* Sign in With data-driven 
    email address and password
    */
    await LoginPage.open();
    await LoginPage.signIn(
      auth.googleAccount.email,
      auth.googleAccount.password
    );
    await ProductPage.open();
  });

  it('verify clicking dot on carousel changes image', async () => {
    /* Click the carousel dot and use
    data-driven testing to assert against 
    the src attribute (DATA DRIVEN TEST)
    */
    await ProductPage.carouselDot2.click();
    await expect(ProductPage.selectedSlideImage).toHaveAttributeContaining(
      'src',
      urls.quality_hat_model_2
    );
  });

  it('verify clicking slide thumbnail changes image', async () => {
    /* Click the slide thumbnail and use
    data-driven testing to assert against 
    the src attribute (DATA DRIVEN TEST)
    */
    await ProductPage.slideItem1.click();
    await expect(ProductPage.selectedSlideImage).toHaveAttributeContaining(
      'src',
      urls.quality_hat_model_1
    );
  });

  it('verify navigation to related item', async () => {
    /* Click the related item and use
    data-driven testing to assert against 
    the browser url (DATA DRIVEN TEST)
    */
    await ProductPage.relatedProductImage.click();
    await expect(browser).toHaveUrlContaining(urls.quality_truck_hat);
  });
});
