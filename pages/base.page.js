const { expect } = require('@playwright/test');
const { MAIN_URL } = require('./page-config');

 function constructor(page, sub_url) {
    this.page = page;
    this.page_url = MAIN_URL + sub_url
    this.getStartedLink = page.locator('a', { hasText: 'Get started' });
    this.gettingStartedHeader = page.locator('h1', { hasText: 'Installation' });
    this.pomLink = page.locator('li', { hasText: 'Guides' }).locator('a', { hasText: 'Page Object Model' });
    this.tocList = page.locator('article div.markdown ul > li > a');
  };

  async function goto() {
    await this.page.goto('https://playwright.dev');
  }

//   function get(target, name) {

//     if name in target.locator_dictionary.keys():
//         return page.locator()
//                 '''because of lazy loading, 
//                    seeking the element before return '''
//                 return self.find_element(self.locator_dictionary[what])
//         except AttributeError:
//             super(BasePage, self).__getattribute__("method_missing")(what)

//     // return `Value for attribute ${name}`
//   }