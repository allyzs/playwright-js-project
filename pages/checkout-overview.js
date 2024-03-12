class CheckoutOverviewPage {

  constructor(page) {
    this.page = page;
    this.checkoutOverviewContainer = page.locator('//*[@id="checkout_summary_container"]')
}


}; 

module.exports = CheckoutOverviewPage