import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display Incap title in navbar', () => {
    page.navigateTo();
    expect(page.getNavbarBrandText()).toEqual('Incap');
  });
});
