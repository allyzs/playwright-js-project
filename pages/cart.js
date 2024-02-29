class CartPage {

  constructor(page) {
    this.page = page;
    
    this.cartItem = page.locator('//div[@class="cart_item"]')
    
    this.continueShoppingBtn = page.locator('//button[@id="continue-shopping"]');
    this.checkoutBtn = page.locator('//button[@id="checkout"]')
  }

  async getCartItemDetails (index) {
    return {
      cart_item_title: await this.cartItem.nth(index).locator('//*[@class="inventory_item_name"]').innerText(),
      cart_item_desc: await this.cartItem.nth(index).locator('//*[@class="inventory_item_desc"]').innerText(),
      cart_item_price: await this.cartItem.nth(index).locator('//*[@class="inventory_item_price"]').innerText(),
    }
  }

  async removeCartItem (index) {
    await this.cartItem.nth(index).locator('//button[text()="Remove"]').click()
  }

  async getAllCartItemDetails () {
    const cartItem = await this.cartItem.all();
    const details = []
    let itemDetail
    for( const [index] of cartItem.entries()) {
      itemDetail = await this.getCartItemDetails(index)
      details.push(itemDetail)
    }

    return details;
  }
};

module.exports = CartPage