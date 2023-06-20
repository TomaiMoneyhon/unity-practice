import { expect } from "@playwright/test";
// import BasePage from './base_page';

exports.ThankYouApplyPage = class ThankYouApplyPage {

  constructor(page) {
    this.page = page;
    this.url = "https://www.is.com/thanks-for-applying/?position_uid="
    this.submision_text = page.locator(':has-text("Your application has been submitted")')
  };

  async assert_submision_success() {
    expect(this.submision_text).toBeVisible();
  };

};