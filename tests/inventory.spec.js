const { test, expect } = require('@playwright/test');
const { LoginPage, InventoryPage } = require('../pages')

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  const credentials = {
    username : 'standard_user',
    password : 'secret_sauce'
  }
  await login.login(credentials);
});

test.describe('Inventory', () => {
  test('Products can be added to cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const productsAdded = await inventory.addMultipleProducts(false);
    
    await expect(inventory.cart).toHaveText(productsAdded.toString());
  });

  test('Products can be removed from cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    let productsAdded = await inventory.addMultipleProducts(false);
    let productsRemoved = await inventory.removeMultipleProducts(productsAdded);

    let remainingProducts = productsAdded - productsRemoved;
    if (remainingProducts == 0) {
      remainingProducts = '';
    } else {
      remainingProducts = remainingProducts.toString();
    }
    await expect(inventory.cart).toHaveText(remainingProducts);
  });

  test('Products can be sorted by name from A to Z', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await expect(inventory.productSortContainer).toHaveValue('az');
    const productsDetails = await inventory.getAllProductsDetails();

    productsDetails.sort((a, b) => {
      const titleA = a.product_title.toUpperCase(); // ignore upper and lowercase
      const titleB = b.product_title.toUpperCase(); // ignore upper and lowercase
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });

    await inventory.productSortContainer.selectOption('az');
    const sortedProducts = await inventory.getAllProductsDetails();

    expect(productsDetails).toStrictEqual(sortedProducts);
  });

  test('Products can be sorted by name from Z to A', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await expect(inventory.productSortContainer).toHaveValue('az');
    const productsDetails = await inventory.getAllProductsDetails();

    productsDetails.sort((a, b) => {
      const titleA = a.product_title.toUpperCase(); // ignore upper and lowercase
      const titleB = b.product_title.toUpperCase(); // ignore upper and lowercase
      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }
      return 0;
    });

    const sortedProductDetails = productsDetails.reverse();


    await inventory.productSortContainer.selectOption('za');
    const sortedProducts = await inventory.getAllProductsDetails();

    expect(sortedProductDetails).toStrictEqual(sortedProducts);
  });

  test('Products can be sorted by price from low to high', async ({ page }) => {
    
  });

  test('Products can be sorted by price from high to low', async ({ page }) => {
    
  });

});