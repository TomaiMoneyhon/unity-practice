import { expect } from "@playwright/test";

exports.ThankYouApplyPage = class ThankYouApplyPage {
  constructor(page) {
    this.page = page;
    this.url = "https://www.is.com/thanks-for-applying/?position_uid=";
    this.submision_text = page.getByText('Your application has been submitted');
  }

  /**
   * @description confirms that the submision was succesfly sent
   */
  async assert_submision_success() {
    await expect(this.submision_text,"your application failed").toBeVisible();
    //TODO add email or DB verification.
  }
};
