const { expect } = require('@playwright/test');

class LoginPage {

  constructor(page) {
    this.page = page;
    this.usernameFld = page.locator('#user-name');
    this.passwordFld = page.locator('#password');
    this.loginBtn = page.locator('#login-button');

    this.usernameWErr = page.locator('//input[@id="user-name"]/following-sibling::*')
    this.passwordWErr = page.locator('//input[@id="password"]/following-sibling::*')
    this.errorMsgContainer = page.locator('//h3[@data-test="error"]');
    this.errorClearBtn = page.locator('//button[@class="error-button"]');

    this.lockedOutErrMsg = 'Epic sadface: Sorry, this user has been locked out.';
    this.blankUsernameErrMsg = 'Epic sadface: Username is required';
    this.blankPasswordErrMsg = 'Epic sadface: Password is required';
    this.wrongCredentialsErrMsg = 'Epic sadface: Username and password do not match any user in this service';
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(credentials) {
    await this.usernameFld.fill(credentials.username);
    await this.passwordFld.fill(credentials.password);
    await this.loginBtn.click();
  }

  async checkErrorIsDisplayed () {
    expect (await this.errorClearBtn).toBeVisible();
    expect (await this.usernameWErr).toBeVisible();
    expect (await this.passwordWErr).toBeVisible();
  }

  async clearErrMsg () {
    await this.errorClearBtn.click();
    expect (await this.errorClearBtn).not.toBeVisible();
    expect (await this.usernameWErr).not.toBeVisible();
    expect (await this.passwordWErr).not.toBeVisible();
  }  
};

module.exports = LoginPage