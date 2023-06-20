import { expect } from "@playwright/test";
import { ComeetFormIframe } from "./iframes/comeet_form_iframe";

//TODO iframe decorator instead of POM ?
// function iframe_decorator (...args){
//     return function (...args) {

//     };

// };

exports.PositionPage = class PositionPage {
  constructor(page) {
    this.page = page;
    this.comeet_form_iframe = new ComeetFormIframe(
      page,
      ".comeetForm .comeet-iframe"
    );
  }

  //TODO add the option to access a random position page
  // async goto_random_position(){
  //   await this.page.goto("https://www.is.com/careers");
  // };

  /**
   * @description fill the from within the comeet iframe
   * @param {string} name has default variable of "automation test"
   * @param {string} email has default variable of: "test@automation.com"
   * @param {string} tel has default variable of: "1234567890"
   * @param {string} linkedin_url has default variable of: "https://www.linkedin.com/in/testautomation/"
   * @param {string} note has default variable of: "AUTOMATION TEST PLEASE DISREGARD"
   */
  async fill_comeet_form(
    name = "automation test",
    email = "test@automation.com",
    tel = "1234567890",
    linkedin_url = "https://www.linkedin.com/in/testautomation/",
    note = "AUTOMATION TEST PLEASE DISREGARD"
  ) {
    await this.comeet_form_iframe.fill_form(
      name,
      email,
      tel,
      linkedin_url,
      note
    );
  }

  async upload_resume_file(
    file_path = "./test_files/" + this.comeet_form_iframe.resume_file_name
  ) {
    await this.comeet_form_iframe.upload_resume(file_path);
  }

  /**
   * @description clicks the submition button and waits for the transfer to a different page
   */
  async submit_comeet_form() {
    const navigationPromise = this.page.waitForNavigation();
    await this.comeet_form_iframe.submit_aplication();
    await navigationPromise;
  }
};
