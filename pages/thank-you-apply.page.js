import { expect } from "@playwright/test";

exports.ThankYouApplyPage = class ThankYouApplyPage {
  constructor(page) {
    this.page = page;
    this.url = "https://www.is.com/thanks-for-applying/?position_uid=";
    this.submisionText = page.getByText('Your application has been submitted');
  }

  /**
   * @description confirms that the submision was succesfly sent
   */
  async assertSubmisionSuccess() {
    await expect(this.submisionText,"your application failed").toBeVisible();
    //TODO add email or DB verification.
  }
};
