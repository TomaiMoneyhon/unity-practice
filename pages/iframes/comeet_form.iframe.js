import { expect } from "@playwright/test";

exports.ComeetFormIframe = class ComeetFormIframe {
  constructor(page, iframe_loc) {
    this.resumeFileName = "sample.pdf";

    this.iframe = page.frameLocator(iframe_loc);
    this.firstNameInput = this.iframe.locator("#inputFirstName");
    this.lastNameInput = this.iframe.locator("#inputLastName");
    this.emailInput = this.iframe.locator("#inputEmail");
    this.telInput = this.iframe.locator("#inputTel");
    this.linkedinInput = this.iframe.locator("#linkedin");
    this.noteInput = this.iframe.locator("#inputNote");
    this.resumeInput = this.iframe.locator(
      "//input [contains(@class,'inputFiles')]"
    );
    this.attachedResume = this.iframe.locator(
      "//div[@id = 'field-resume-aria-desc']"
    );
    this.submitBTN = this.iframe.locator(".applyButton");
    this.submisionError = this.iframe.locator("div .error");
    this.submisionSpinner = this.iframe.locator(
      "i .fa .fa-spinner .loadingIcon .icon-light"
    );
    /**
     * @description fills all parameters in the form
     */
  }

  /**
   * @description fills all parameters in the form
   */
  async fill_form(name, email, tel, linkedin_url, note) {
    await this.input_form(this.firstNameInput, name);
    await this.input_form(this.lastNameInput, name);
    await this.input_form(this.emailInput, email);
    await this.input_form(this.telInput, tel);
    await this.input_form(this.linkedinInput, linkedin_url);
    await this.input_form(this.noteInput, note);
  }

  /**
   * @description input information into a textfield of the form
   * @param {locator} imputLoc
   * @param {string} msg
   */
  async input_form(imputLoc, msg) {
    await imputLoc.fill(msg);
    await expect(imputLoc, "text field was incorrectly").toHaveValue(msg);
  }

  /**
   * @description uploads a file to the 'add resume' section of the form
   * @param {string} filePATH has a default path if none is set.
   */
  async upload_resume(filePATH) {
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
