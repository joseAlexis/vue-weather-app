describe('Weather App', () => {
  beforeEach(function () {
    cy.visit('/');
  })

  it('Should be able to get the regions weather', () => {
    cy.intercept(/.*\/data\/2.5\/weather\?q=(.*)&units=(.*)&APPID=(.*)/).as('getWeather');

    cy.get('[cy-data="searchRegion"]').clear().type('Malaga{enter}');
    cy.wait('@getWeather').then(({ response }) => {
      expect(response.statusCode).to.equal(200);

      cy.get('[cy-data="date"]').should('be.visible');
      cy.get('[cy-data="region"]').should('be.visible').and('contain', `${response.body.name}, ${response.body.sys.country}`);
      cy.get('[cy-data="temp"]').should('be.visible').and('contain', `${Math.round(response.body.main.temp)}°c`);
      cy.get('[cy-data="weather"]').should('be.visible').and('contain', response.body.weather[0].main);
    });

  });
})