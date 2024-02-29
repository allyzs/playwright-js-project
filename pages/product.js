class ProductPage {

  constructor(page) {
    this.page = page;
    this.backToInventoryBtn = page.locator('#back-to-products')
    this.productContainer = page.locator('.inventory_details_container');
    this.productDesc = page.locator('div.inventory_details_desc');
    this.productName = page.locator('div.inventory_details_name');
    this.productPrice = page.locator('div.inventory_details_price');

    this.addToCartBtn = page.locator('//button[text()="Add to cart"]');
    this.removeFromCartBtn = page.locator('//button[text()="Remove"]');
  }


};

module.exports = ProductPage