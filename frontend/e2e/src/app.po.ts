import { browser, by, element, ElementFinder, promise } from 'protractor';

export class AppPage {
  navigateTo(): promise.Promise<any> {
    return browser.get('/');
  }

  getNavbarBrandText(): promise.Promise<string> {
    return element(by.css('app-root nav.navbar a.navbar-brand')).getText();
  }
}
