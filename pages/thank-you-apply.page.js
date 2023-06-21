import { expect } from "@playwright/test";
import { BasePage } from "./base.page";

exports.ThankYouApplyPage = class ThankYouApplyPage extends BasePage {
  constructor(page) {
    //TODO add logic for getting position_uid (from db maybe or by accessing curent position)
    super(page, "thanks-for-applying/?position_uid=");
    this.submisionText = page.getByText("Your application has been submitted");
  }

  /**
   * @description confirms that the submision was succesfly sent
   */
  async assertSubmisionSuccess() {
    await expect(this.submisionText, "your application failed").toBeVisible();
    //TODO add email or DB verification.
  }
};
