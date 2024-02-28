const { test, expect } = require('@playwright/test');
const { LoginPage, InventoryPage, ProductPage } = require('../pages')

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  const credentials = {
    username : 'standard_user',
    password : 'secret_sauce'
  }
  await login.login(credentials);
});

test.describe('Inventory Item', () => {
  test('Inventory item can be viewed individually', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const product = new ProductPage(page);
    const openedProductDetails = await inventory.openInventoryItem();

    await product.productContainer.waitFor();

    await expect(product.productName).toHaveText(openedProductDetails.product_title);
    await expect(product.productDesc).toHaveText(openedProductDetails.product_description);
    await expect(product.productPrice).toHaveText(openedProductDetails.product_price);
  });

  test('User can navigate back to Inventory pages from Inventory item page', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const product = new ProductPage(page);
    await inventory.openInventoryItem();
    await product.productContainer.waitFor();
    await product.backToInventoryBtn.click();
    
    await expect(inventory.productContainer).toBeVisible();
  });

  test('Product can be added from Inventory Item Page', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const product = new ProductPage(page);
    await inventory.openInventoryItem();

    await product.addToCartBtn.click();
    await expect(inventory.cart).toHaveText("1");
  });

  test('Product can be removed from Inventory Item page', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const product = new ProductPage(page);
    await inventory.openInventoryItem();

    await product.addToCartBtn.click();
    await expect(inventory.cart).toHaveText("1");
    await product.removeFromCartBtn.click();
    await expect(inventory.cart).toHaveText("");
  });

});