import { TiendaVirtualPage } from './app.po';

describe('tienda-virtual App', function() {
  let page: TiendaVirtualPage;

  beforeEach(() => {
    page = new TiendaVirtualPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
