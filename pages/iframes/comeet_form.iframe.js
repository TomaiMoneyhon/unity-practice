import { expect } from "@playwright/test";
import { BasePage } from "../base.page";

exports.ComeetFormIframe = class ComeetFormIframe extends BasePage {
  constructor(page) {
    super(page);
    this.resumeFileName = "sample.pdf";

    this.page = page;
    this.firstNameInput = this.page.locator("#inputFirstName");
    this.lastNameInput = this.page.locator("#inputLastName");
    this.emailInput = this.page.locator("#inputEmail");
    this.telInput = this.page.locator("#inputTel");
    this.linkedinInput = this.page.locator("#linkedin");
    this.noteInput = this.page.locator("#inputNote");
    this.resumeInput = this.page.locator("#cv");
    this.attachedResume = this.page.locator("#field-resume-aria-desc");
    this.submitBTN = this.page.locator(".applyButton");
    this.submisionError = this.page.locator("div .error");
    this.submisionSpinner = this.page.locator(
      "i .fa .fa-spinner .loadingIcon .icon-light"
    );
  }

  /**
   * @description fills all parameters in the form
   * @param {string} name has default variable of "automation test"
   * @param {string} email has default variable of: "test@automation.com"
   * @param {string} tel has default variable of: "1234567890"
   * @param {string} linkedinURL has default variable of: "https://www.linkedin.com/in/testautomation/"
   * @param {string} note has default variable of: "AUTOMATION TEST PLEASE DISREGARD"
   */
  async fill_form(
    name = "automation test",
    email = "test@automation.com",
    tel = "1234567890",
    linkedinURL = "https://www.linkedin.com/in/testautomation/",
    note = "AUTOMATION TEST PLEASE DISREGARD"
  ) {
    await this.fill(this.firstNameInput, name);
    await this.fill(this.lastNameInput, name);
    await this.fill(this.emailInput, email);
    await this.fill(this.telInput, tel);
    await this.fill(this.linkedinInput, linkedinURL);
    await this.fill(this.noteInput, note);
  }

  /**
   * @description uploads a file to the 'add resume' section of the form
   * @param {String} filePATH has default path of: "./test_files/" + this.resumeFileName
   */
  async upload_resume(filePATH = "./resume-test-files/" + this.resumeFileName) {
    await this.resumeInput.setInputFiles(filePATH);
    await expect(
      this.attachedResume,
      "file was not attched properly"
    ).toHaveText(this.resumeFileName);
  }

  /**
   * @description submits form aplication
   */
  async submit_aplication() {
    await this.submitBTN.click();
    await expect(
      this.submisionError,
      "there was an error with the submision"
    ).toBeHidden();
    await expect(
      this.submisionSpinner,
      "the submision got stuck loading"
    ).toBeHidden();
  }
};
