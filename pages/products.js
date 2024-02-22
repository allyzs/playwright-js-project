const { expect } = require('@playwright/test');

class ProductsPage {

  constructor(page) {
    this.page = page;
    this.productContainer = page.locator('#inventory_container');
    this.passwordFld = page.locator('#password');
    this.loginBtn = page.locator('#login-button');

  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(credentials) {
    await this.usernameFld.fill(credentials.username);
    await this.passwordFld.fill(credentials.password);
    await this.loginBtn.click();
  }

  async pageObjectModel() {
    await this.getStarted();
    await this.pomLink.click();
  }
};

module.exports = ProductsPage