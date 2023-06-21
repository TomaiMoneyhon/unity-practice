import { expect } from "@playwright/test";
import { ComeetFormIframe } from "./iframes/comeet_form.iframe";
import { BasePage } from "./base.page";

//TODO iframe decorator instead of POM ?
// function iframe_decorator (...args){
//     return function (...args) {

//     };

// };

exports.PositionPage = class PositionPage extends BasePage {
  constructor(page) {
    //TODO add logic for getting current position url i.e. "/75-b3d-senior-qa-and-automation-engineer-cross"
    super(page);
    this.comeetIframe = new ComeetFormIframe(
      page.frameLocator(".comeetForm .comeet-iframe")
    );
  }

  //TODO add the option to access a random position page
  // async goto_random_position(){
  //   await this.page.goto("https://www.is.com/careers");
  // };

  /**
   * @description fill the from within the comeet iframe
   * @param {string} name
   * @param {string} email
   * @param {string} tel
   * @param {string} linkedinURL
   * @param {string} note
   */
  async fill_comeet_form(name, email, tel, linkedinURL, note) {
    await this.comeetIframe.fill_form(name, email, tel, linkedinURL, note);
  }

  /**
   * @description uploads a resume to the comeet iframe form
   * @param {String} filePATH
   */
  async upload_resume_file(filePATH) {
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
