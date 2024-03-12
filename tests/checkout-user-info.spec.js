const { test, expect } = require('@playwright/test');
const { LoginPage, InventoryPage, CartPage, CheckoutInfoPage,
  CheckoutOverviewPage} = require('../pages')

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);

  await login.goto();
  const credentials = {
    username : 'standard_user',
    password : 'secret_sauce'
  }
  await login.login(credentials);
  await inventory.addMultipleProducts();
  await inventory.cart.click()
  await cart.checkoutBtn.click();
});

test.describe('Check Out: User Information', () => {
  test('Error message is displayed for checking out with blank first name', async ({ page }) => {
    const checkOutInfo = new CheckoutInfoPage(page)
    await checkOutInfo.fillCheckoutInfoFormAndProceed('blank first name');

    await expect(checkOutInfo.errorContainer).toHaveText(checkOutInfo.blankFirstNameErrMsg)
    await checkOutInfo.checkErrorIsDisplayed();

    await checkOutInfo.clearErrMsg();
  });

  test('Error message is displayed for checking out with blank last name', async ({ page }) => {
    const checkOutInfo = new CheckoutInfoPage(page)
    await checkOutInfo.fillCheckoutInfoFormAndProceed('blank last name');

    await expect(checkOutInfo.errorContainer).toHaveText(checkOutInfo.blankLastNameErrMsg)
    await checkOutInfo.checkErrorIsDisplayed();

    await checkOutInfo.clearErrMsg();
  });

  test('Error message is displayed for checking out with blank zip/postal code', async ({ page }) => {
    const checkOutInfo = new CheckoutInfoPage(page);
    await checkOutInfo.fillCheckoutInfoFormAndProceed('blank zip code');

    await expect(checkOutInfo.errorContainer).toHaveText(checkOutInfo.blankPostalCodeErrMsg)
    await checkOutInfo.checkErrorIsDisplayed();

    await checkOutInfo.clearErrMsg();
  });

  test('User can cancel the checkout from Check Out: User Information page', async ({ page }) => {
    const checkOutInfo = new CheckoutInfoPage(page);
    const cart = new CartPage(page);
    await checkOutInfo.cancelBtn.click();

    await expect(cart.cartItem.first()).toBeVisible();
  });

  test('User can open the cart from Check Out: User Information page', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    await inventory.cart.click();
    await expect(cart.cartItem.first()).toBeVisible();
  });

  test('User can proceed with the checkout using valid information', async ({ page }) => {
    const checkOutInfo = new CheckoutInfoPage(page);
    const overview = new CheckoutOverviewPage(page);
    await checkOutInfo.fillCheckoutInfoFormAndProceed();
    await expect(overview.checkoutOverviewContainer).toBeVisible();
  });

});