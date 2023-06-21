import { expect } from "@playwright/test";
import {BasePage} from "./base.page";

exports.CareersPage = class CareersPage extends BasePage {
  constructor(page) {
    super(page, "careers");
    this.searchInput = page.locator(".search-holder input");
    this.errorMsg = page.locator(".error-msg");
    this.careerItem = page.locator(".career-item");
    //TODO can you extract the class ".career-item" from this.careerItem?
    this.careerLink = page.locator(".career-item .fw-link");
    this.dropdowns = page.locator(".dropdown");
  }

  /**
   * @description select an option from the 'Locations' dropdown
   * @param {string} option
   */
  async selectFromLocationsDropDown(option) {
    await this.selectFromDropdown("Locations", option);
  }

  /**
   * @description select an option form the 'Teams' dropdown
   * @param {String} option
   */
  async selectFromTeamsDropDown(option) {
    await this.selectFromDropdown("Teams", option);
  }

  /**
   *
   * @description INTERNAL FUNCTION Find the required dropdown by using the 'name' param
   * and then click on the option required by using the 'option' param.
   * @param {import('@playwright/test').Page} page
   * @param {string} name
   * @param {*} option
   */
  async selectFromDropdown(name, option) {
    await expect(this.dropdowns.first()).toBeVisible();
    const dropdownCount = await this.dropdowns.count();
    for (let i = 0; i < dropdownCount; i++) {
      var loc = await this.dropdowns.nth(i);
      await expect(loc, "dropdown should be visible").toBeVisible();
      const dropdownLoc = await loc.getByText(name);
      if ((await dropdownLoc.count()) != 0) {
        await dropdownLoc.click();
        await expect(loc, "dropdown is not selected").toHaveClass(/selected/);
        await expect(
          dropdownLoc.locator(".options"),
          "dropdown options are not selectable"
        ).toBeVisible();
        const selectedOption = await dropdownLoc.locator("li", {
          hasText: option,
        });
        selectedOption.click();
        await expect(
          selectedOption,
          "dropdown option was not selected"
        ).toHaveClass("active");
        return;
      }
    }
  }

  /**
   * @description input into the search textfield with the 'search' string and click enter.
   * @param {string} search
   */
  async inputSearch(search) {
    await this.fill(this.searchInput, search);
    await this.searchInput.press("Enter");
    await this.assertCareerItem();
    await expect(
      this.careerItem,
      "Career item search returned incorrect result"
    ).toContainText(search, { ignoreCase: true });
  }

  /**
   * @description assert that no erorrs apear and that at least one cereer item is visible
   */
  async assertCareerItem() {
    await expect(
      this.errorMsg,
      "errror message appeared instead of cereer items"
    ).toBeHidden();
    await expect(this.careerItem, "no career items on page").toBeVisible();
  }

  /**
   * @description select a cereer item from the list
   */
  async selectCareerItem() {
    await this.assertCareerItem();
    const expected_url = await this.careerLink.getAttribute("href");
    await this.careerLink.first().click();
    await expect(this.page, "transfered to incorrect url").toHaveURL(
      "https://www.is.com" + expected_url
    );
  }
};
