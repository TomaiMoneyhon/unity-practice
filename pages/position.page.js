import { expect } from "@playwright/test";
import { ComeetFormIframe } from "./iframes/comeet_form.iframe";

//TODO iframe decorator instead of POM ?
// function iframe_decorator (...args){
//     return function (...args) {

//     };

// };

exports.PositionPage = class PositionPage {
  constructor(page) {
    this.page = page;
    this.comeetIframe = new ComeetFormIframe(
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
   * @param {string} linkedinURL has default variable of: "https://www.linkedin.com/in/testautomation/"
   * @param {string} note has default variable of: "AUTOMATION TEST PLEASE DISREGARD"
   */
  async fill_comeet_form(
    name = "automation test",
    email = "test@automation.com",
    tel = "1234567890",
    linkedinURL = "https://www.linkedin.com/in/testautomation/",
    note = "AUTOMATION TEST PLEASE DISREGARD"
  ) {
    await this.comeetIframe.fill_form(
      name,
      email,
      tel,
      linkedinURL,
      note
    );
  }

  /**
   * @description uploads a resume to the comeet iframe form
   * @param {String} filePATH has default path of: "./test_files/" + this.comeetIframe.resumeFileName
   */
  async upload_resume_file(
    filePATH = "./test_files/" + this.comeetIframe.resumeFileName
  ) {
    await this.comeetIframe.upload_resume(filePATH);
  }

  /**
   * @description clicks the submition button in the comeet iframe and waits for the transfer to a different page
   */
  async submit_comeet_form() {
    const navigationPromise = this.page.waitForNavigation();
    await this.comeetIframe.submit_aplication();
    await navigationPromise;
  }
};
