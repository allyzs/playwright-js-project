const { expect } = require('@playwright/test');

class InventoryPage {

  constructor(page) {
    this.page = page;
    this.productContainer = page.locator('.inventory_list');
    
    this.productSortContainer = page.locator('//select[@class="product_sort_container"]');
    this.productItem = page.locator('//div[@class="inventory_item"]');

    this.cart = page.locator('//a[@class="shopping_cart_link"]')
  }

  async waitForProductsToLoad() {
    await this.productContainer.waitFor();
  }
  async addMultipleProducts(getProductDetails = false) {
    await this.waitForProductsToLoad();

    const products = await this.productItem.all();
    const maxNumber = products.length - 1
    const numOfProductsToAdd = Math.floor((Math.random() * maxNumber)) + 1
    let productsDetails = []
    for (let i = 0; i < numOfProductsToAdd; i++){
      if (getProductDetails) {
        const productDetail = await this.getProductDetails(i);
        productsDetails.push(productDetail);
      }
      await this.addToCart(i)
    }

    return getProductDetails? productsDetails: numOfProductsToAdd;
  }

  async removeMultipleProducts(productsAdded) {
    const maxNumber = productsAdded - 1;
    const numOfProductsToRemove = Math.floor((Math.random() * maxNumber)) + 1;
    for (let i = 0; i < numOfProductsToRemove; i++)
      await this.removeFromCart(i);

    return numOfProductsToRemove;
  }

  async addToCart(index) {
    await this.productItem.nth(index).locator('//button[text()="Add to cart"]').click();
  }

  async removeFromCart (index) {
    await this.productItem.nth(index).locator('//button[text()="Remove"]').click();
  }

  async getAllProductsDetails () {
    const products = await this.productItem.all()
    const details = []
    let itemDetail
    for( const [index] of products.entries()) {
      itemDetail = await this.getProductDetails(index)
      details.push(itemDetail)
    }

    return details
  }

  async getProductDetails(index) {
    return {
      product_title: await this.productItem.nth(index).locator('//div[@class="inventory_item_name "]').innerText(),
      product_description: await this.productItem.nth(index).locator('//div[@class="inventory_item_desc"]').innerText(),
      product_price: await this.productItem.nth(index).locator('//div[@class="inventory_item_price"]').innerText()
    }
  }

  async getCartDetails () {
    return this.cart.innerText();
  }
  
};

module.exports = InventoryPage