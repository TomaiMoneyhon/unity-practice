import { expect } from "@playwright/test";
import { MAINURL } from "./page.config";

exports.BasePage = class BasePage {
  constructor(page, subURL = '') {
    this.page = page;
    this.url = MAINURL + subURL;
  }

  /**
   * @description go to this POM url
   */
  async goto() {
    await this.page.goto(this.url);
  }

  /**
   * @description fills a input with desired text.
   * This method makes sure all previous text has been removed and asserts that the desired text was inputed
   * TODO is this necasery? maybe the method "fill" already does this
   * @param {import("@playwright/test").Locator} inputLoc 
   * @param {string} text 
   */
  async fill(inputLoc, text) {
    await inputLoc.press("Control+A");
    await inputLoc.press("Delete");
    await expect(inputLoc, "typed input is incorrect").toHaveValue('');
    await inputLoc.fill(text);
    await expect(inputLoc, "typed input is incorrect").toHaveValue(text);
  }
};