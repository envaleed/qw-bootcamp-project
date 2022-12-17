const LoginPage = require('../pageobjects/login.page');
const strings = require('../data/strings.data');
const auth = require('../data/auth.data');
const ProductsPage = require('../pageobjects/products.page');
const WishlistPage = require('../pageobjects/wishlist.page');

describe('Wishlist', () => {
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

  it('verify empty favorites list', async () => {
    await WishlistPage.open();
    await expect(WishlistPage.noFavoritesIcon).toBeDisplayed();
    await expect(WishlistPage.noFavoritesText).toHaveTextContaining(
      strings.empty_favorites_heading
    );
    await expect(WishlistPage.noFavoritesSubText).toHaveTextContaining(
      strings.empty_favorites_subtext
    );
  });

  it('verify toast when adding favorite from home page', async () => {
    await ProductsPage.open();
    await ProductsPage.addToFavorites();
    await ProductsPage.favoriteToast.waitForDisplayed();
    await expect(ProductsPage.favoriteToast).toHaveTextContaining(
      strings.added_to_favourites_text
    );
  });

  it('verify toast when removing favorite from home page', async () => {
    await ProductsPage.open();
    await ProductsPage.removeFromFavorites();
    await ProductsPage.favoriteToast.waitForDisplayed();
    await expect(ProductsPage.favoriteToast).toHaveTextContaining(
      strings.removed_from_favorites_text
    );
  });

  it('verify item shows in favorite list', async () => {
    await ProductsPage.open();
    const itemString = await ProductsPage.productName.getText();
    await ProductsPage.addToFavorites();
    await WishlistPage.open();
    await WishlistPage.itemText.waitForDisplayed();
    await expect(WishlistPage.itemText).toHaveTextContaining(itemString);
  });

  it('verify remove favorite from wishlist page', async () => {
    await ProductsPage.open();
    await ProductsPage.addToFavorites();
    await WishlistPage.open();
    await WishlistPage.removeFavorite();
    await expect(WishlistPage.noFavoritesIcon).toBeDisplayed();
    await expect(WishlistPage.noFavoritesText).toHaveTextContaining(
      strings.empty_favorites_heading
    );
    await expect(WishlistPage.noFavoritesSubText).toHaveTextContaining(
      strings.empty_favorites_subtext
    );
  });
});
