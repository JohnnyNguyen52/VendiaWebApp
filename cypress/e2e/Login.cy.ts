describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000')
  })
})

//so create two terminals. 
//One that will normally run "npm run dev"
//Then another that run "npm run cypress"
//Within there choose the one called E2E Testing which should be configured then you can create specs and go from there.
