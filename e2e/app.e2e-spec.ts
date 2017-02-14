import { AngularApiRiotGamesPage } from './app.po';

describe('angular-api-riot-games App', function() {
  let page: AngularApiRiotGamesPage;

  beforeEach(() => {
    page = new AngularApiRiotGamesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
