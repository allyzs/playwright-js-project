const { test, expect } = require('@playwright/test');
const { LoginPage, ProductsPage } = require('../pages')

test.beforeEach(async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
});

test.describe('Login', () => {
  test('Standard User can successfully logged in', async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);
    const credentials = {
      username : 'standard_user',
      password : 'secret_sauce'
    }
    await login.login(credentials);
    expect(await products.productContainer.first()).toBeVisible()
  });

  test('Error message is displayed for Locked out User', async ({ page }) => {
    const login = new LoginPage(page);
    const credentials = {
      username : 'locked_out_user',
      password : 'secret_sauce'
    }
    await login.login(credentials);
    await login.checkErrorIsDisplayed();
    expect(await login.errorMsgContainer).toHaveText(login.lockedOutErrMsg);
    await login.clearErrMsg();
  });

  test('Error message is displayed for using wrong username', async ({ page }) => {
    const login = new LoginPage(page);
    const credentials = {
      username : 'standard',
      password : 'secret_sauce'
    }
    await login.login(credentials);
    await login.checkErrorIsDisplayed();
    expect(await login.errorMsgContainer).toHaveText(login.wrongCredentialsErrMsg);
    await login.clearErrMsg();
  });

  test('Error message is displayed for using wrong password', async ({ page }) => {
    const login = new LoginPage(page);
    const credentials = {
      username : 'standard_user',
      password : 'secret_sauce1'
    }
    await login.login(credentials);

    expect(await login.errorMsgContainer).toHaveText(login.wrongCredentialsErrMsg);
    await login.clearErrMsg();
  });

  test('Error message is displayed for logging in with blank credentials', async ({ page }) => {
    const login = new LoginPage(page);
    await login.loginBtn.click();

    expect(await login.errorMsgContainer).toHaveText(login.blankUsernameErrMsg);
    await login.clearErrMsg();
  });

  test('Error message is displayed for logging in with blank username', async ({ page }) => {
    const login = new LoginPage(page);
    const credentials = {
      username : '',
      password : 'secret_sauce'
    }
    await login.login(credentials);

    expect(await login.errorMsgContainer).toHaveText(login.blankUsernameErrMsg);
    await login.clearErrMsg();
  });

  test('Error message is displayed for logging in with blank password', async ({ page }) => {
    const login = new LoginPage(page);
    const credentials = {
      username : 'standard_user',
      password : ''
    }
    await login.login(credentials);

    expect(await login.errorMsgContainer).toHaveText(login.blankPasswordErrMsg);
    await login.clearErrMsg();
  });

});