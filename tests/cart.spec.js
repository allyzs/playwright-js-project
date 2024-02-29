const { test, expect } = require('@playwright/test');
const { LoginPage, InventoryPage, ProductPage, CartPage } = require('../pages');
const exp = require('constants');

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  const credentials = {
    username : 'standard_user',
    password : 'secret_sauce'
  }
  await login.login(credentials);
});

test.describe('Cart', () => {
  test('User can see the correct details of added items in the cart from the inventory page', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    const productsAdded = await inventory.addMultipleProducts(true);

    await inventory.cart.click();
    const cartItems = await cart.getAllCartItemDetails();

    for (let i = 0; i < productsAdded.length; i++) {
      expect(cartItems[i].cart_item_title).toBe(productsAdded[i].product_title);
      expect(cartItems[i].cart_item_desc).toBe(productsAdded[i].product_description);
      expect(cartItems[i].cart_item_price).toBe(productsAdded[i].product_price);
    }
    
  });

  test('User can see the correct details of added item in the cart from the product page', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const product = new ProductPage(page);
    const cart = new CartPage(page);

    await expect(inventory.cart).toHaveText("");
    const productAdded = await inventory.openInventoryItem();

    await product.addToCartBtn.click();
    await inventory.cart.click();

    const cartItem = await cart.getCartItemDetails(0);

    expect(cartItem.cart_item_title).toBe(productAdded.product_title);
    expect(cartItem.cart_item_desc).toBe(productAdded.product_description);
    expect(cartItem.cart_item_price).toBe(productAdded.product_price);

  });

  test('User can navigate back to Inventory pages from Cart page', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    await inventory.cart.click();
    await cart.continueShoppingBtn.click();

    await expect(inventory.productContainer).toBeVisible();
  });

  test('User can remove items from the cart', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);

    const numOfAddedProducts = await inventory.addMultipleProducts();
    await inventory.cart.click();

    await cart.removeCartItem(0);
    const cartItems = await cart.cartItem.all();

    expect(cartItems.length).toBeLessThan(numOfAddedProducts);

  });

  test('No items are displayed in cart if cart is empty', async ({ page }) => {
    const inventory = new InventoryPage(page);
    const cart = new CartPage(page);
    await expect(inventory.cart).toHaveText("");

    await inventory.cart.click();

    await expect(cart.cartItem.first()).not.toBeVisible();
  });

});