import { expect } from "@playwright/test";

exports.ComeetFormIframe = class ComeetFormIframe {
  constructor(page, iframe_loc) {
    this.resume_file_name = "sample.pdf";

    this.iframe = page.frameLocator(iframe_loc);
    this.first_name_input = this.iframe.locator("#inputFirstName");
    this.last_name_input = this.iframe.locator("#inputLastName");
    this.email_input = this.iframe.locator("#inputEmail");
    this.tel_input = this.iframe.locator("#inputTel");
    this.linkedin_input = this.iframe.locator("#linkedin");
    this.note_input = this.iframe.locator("#inputNote");
    this.resume_input = this.iframe.locator(
      "//input [contains(@class,'inputFiles')]"
    );
    this.attached_resume = this.iframe.locator(
      "//div[@id = 'field-resume-aria-desc']"
    );
    this.submit_BTN = this.iframe.locator(".applyButton");
    this.submision_error = this.iframe.locator("div .error");
    this.submision_spinner = this.iframe.locator(
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
    await this.input_form(this.first_name_input, name);
    await this.input_form(this.last_name_input, name);
    await this.input_form(this.email_input, email);
    await this.input_form(this.tel_input, tel);
    await this.input_form(this.linkedin_input, linkedin_url);
    await this.input_form(this.note_input, note);
  }

  /**
   * @description input information into a textfield of the form
   * @param {locator} imput_loc
   * @param {string} msg
   */
  async input_form(imput_loc, msg) {
    await imput_loc.fill(msg);
    await expect(imput_loc, "text field was incorrectly").toHaveValue(msg);
  }

  /**
   * @description uploads a file to the 'add resume' section of the form
   * @param {string} file_path has a default path if none is set.
   */
  async upload_resume(file_path) {
    await this.resume_input.setInputFiles(file_path);
    await expect(
      this.attached_resume,
      "file was not attched properly"
    ).toHaveText(this.resume_file_name);
  }

  async submit_aplication() {
    await this.submit_BTN.click();
    await expect(this.submision_error).toBeHidden();
    await expect(this.submision_spinner).toBeHidden();
  }
};
