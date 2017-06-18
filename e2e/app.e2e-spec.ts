import { NeargreenPage } from './app.po';

describe('neargreen App', () => {
  let page: NeargreenPage;

  beforeEach(() => {
    page = new NeargreenPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
