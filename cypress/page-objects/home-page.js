class homePageClass {
  open() {
    cy.visit("http://localhost:8080/");
  }

  get exercise1Link() {
    return cy.get("[data-cy=link-exercise1]");
  }

  get exercise2Link() {
    return cy.get("[data-cy=link-exercise2]");
  }
}
export const homePage = new homePageClass();
