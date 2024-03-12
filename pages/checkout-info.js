const { expect } = require('@playwright/test');

class CheckoutInfoPage {

  constructor(page) {
    this.page = page;
    this.checkoutInfoContainer = page.locator('#checkout_info_container');
    this.firstNameFld = page.locator('#first-name')
    this.lastNameFld = page.locator('#last-name')
    this.zipCodeFld = page.locator('#postal-code')

    this.cancelBtn = page.locator('//button[text()="Cancel"]')
    this.continueBtn = page.locator('//input[@id="continue"]')
  

    this.firstNameErr = page.locator('//input[@id="first-name"]/following-sibling::*')
    this.lastNameErr = page.locator('//input[@id="last-name"]/following-sibling::*')
    this.zipCodeErr = page.locator('//input[@id="postal-code"]/following-sibling::*')

    this.errorContainer = page.locator('//*[@data-test="error"]')
    this.clearErrorBtn = page.locator('//button[@class="error-button"]')
    this.blankFirstNameErrMsg = 'Error: First Name is required'
    this.blankLastNameErrMsg = 'Error: Last Name is required'
    this.blankPostalCodeErrMsg = 'Error: Postal Code is required'
}

  async fillCheckoutInfoForm (scenario = '') {
    let firstName = 'Ally'
    let lastName = 'Cart'
    let zipCode = '78759'

    switch(scenario) {
        case 'blank first name':
            firstName = '';
            break;
        case 'blank last name':
            lastName = '';
            break;
        case 'blank zip code':
            zipCode = ''
            break
        default:
    }

    await this.firstNameFld.fill(firstName);
    await this.lastNameFld.fill(lastName);
    await this.zipCodeFld.fill(zipCode)
  }

  async fillCheckoutInfoFormAndProceed (scenario) {
    await this.fillCheckoutInfoForm(scenario)
    await this.continueBtn.click();
  }

  async checkErrorIsDisplayed () {
    await expect(this.firstNameErr).toBeVisible();
    await expect(this.lastNameErr).toBeVisible();
    await expect(this.zipCodeErr).toBeVisible();
  }

  async clearErrMsg () {
    await this.clearErrorBtn.click();
    await expect(this.firstNameErr).not.toBeVisible();
    await expect(this.lastNameErr).not.toBeVisible();
    await expect(this.zipCodeErr).not.toBeVisible();
  }
}; 

module.exports = CheckoutInfoPage