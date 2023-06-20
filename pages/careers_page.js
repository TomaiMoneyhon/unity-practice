import { expect } from "@playwright/test";

exports.CareersPage = class CareersPage {
  constructor(page) {
    this.page = page;
    this.url = "https://www.is.com/careers";
    this.search_input = page.locator(".search-holder input");
    this.error_msg = page.locator(".error-msg");
    this.career_item = page.locator(".career-item");
    //TODO can you extract the class ".career-item" from this.career_item?
    this.career_link = page.locator(".career-item .fw-link");
  }

  async goto() {
    await this.page.goto(this.url);
  }

  /**
   * @description select an option from the 'Locations' dropdown
   * @param {string} option
   */
  async selectFromLocationsDropDown(option) {
    await CareersPage.#selectFromDropdown(this.page, "Locations", option);
  }

  /**
   * @description select an option form the 'Teams' dropdown
   * @param {String} option
   */
  async selectFromTeamsDropDown(option) {
    await CareersPage.#selectFromDropdown(this.page, "Teams", option);
  }

  /**
   *
   * @description INTERNAL FUNCTION Find the required dropdown by using the 'name' param
   * and then click on the option required by using the 'option' param.
   * @param {import('@playwright/test').Page} page
   * @param {string} name
   * @param {*} option
   */
  static async #selectFromDropdown(page, name, option) {
    const dropdown_class = "dropdown";
    const selected_dropdown_class = "selected";
    //TODO Why do Template literals not work?
    await page.waitForSelector("." + dropdown_class);
    //TODO Why do Template literals not work?
    const dropdowns = await page.locator("." + dropdown_class);
    const dropdowncount = await dropdowns.count();
    for (let i = 0; i < dropdowncount; i++) {
      var loc = await dropdowns.nth(i);
      await expect(loc, "dropdown should be visible").toBeVisible();
      const dropdown_loc = await loc.getByText(name);
      if ((await dropdown_loc.count()) != 0) {
        await dropdown_loc.click();
        //TODO Why do Template literals not work?
        await expect(loc, "dropdown is not selected").toHaveClass(
          dropdown_class + " " + selected_dropdown_class
        );
        await expect(
          dropdown_loc.locator(".options"),
          "dropdown options are not selectable"
        ).toBeVisible();
        const selected_option = await dropdown_loc.locator("li", {
          hasText: option,
        });
        selected_option.click();
        await expect(
          selected_option,
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
    await this.search_input.fill(search);
    await expect(this.search_input, "typed input is incorrect").toHaveValue(
      search
    );
    await this.search_input.press("Enter");
    await this.assert_career_item();
    await expect(
      this.career_item,
      "Career item search returned incorrect result"
    ).toContainText(search, { ignoreCase: true });
  }

  /**
   * @description assert that no erorrs apear and that at least one cereer item is visible
   */
  async assert_career_item() {
    await expect(
      this.error_msg,
      "errror message appeared instead of cereer items"
    ).toBeHidden();
    await expect(this.career_item, "no career items on page").toBeVisible();
  }

  /**
   * @description select a cereer item from the list
   */
  async selectCareerItem() {
    await this.assert_career_item();
    const expected_url = await this.career_link.getAttribute("href");
    await this.career_link.first().click();
    await expect(this.page, "transfered to incorrect url").toHaveURL(
      "https://www.is.com" + expected_url
    );
  }
};
