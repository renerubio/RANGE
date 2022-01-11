import "@4tw/cypress-drag-drop";

class rangePageClass {
  open() {
    cy.visit("http://localhost:8080/");
  }

  openExercise1() {
    cy.visit("http://localhost:8080/exercise1");
  }

  openExercise2() {
    cy.visit("http://localhost:8080/exercise2");
  }

  get exercise1Link() {
    return cy.get("[data-cy=link-exercise1]");
  }

  get exercise2Link() {
    return cy.get("[data-cy=link-exercise2]");
  }

  get exercise1Title() {
    return cy.get("[data-cy=title-exercise1]");
  }

  get exercise2Title() {
    return cy.get("[data-cy=title-exercise2]");
  }

  get backToHome() {
    return cy.get("[data-cy=back-to-home]");
  }

  get minValue() {
    return 1;
  }

  get maxValue() {
    return 10000;
  }

  get minInput() {
    return cy.get("[data-cy=min]");
  }

  fillMinInput(value) {
    const minField = cy.get("[data-cy=min]");
    minField.type("{selectall}").type(value);
  }

  get maxInput() {
    return cy.get("[data-cy=max]");
  }

  fillMaxInput(value) {
    const maxField = cy.get("[data-cy=max]");
    maxField.type("{selectall}").type(value);
  }

  get draggableMin() {
    return cy.get("[data-cy=draggable-min]");
  }

  get draggableMax() {
    return cy.get("[data-cy=draggable-max]");
  }

  moveDraggableMin(position) {
    cy.get("[data-cy=draggable-min]").move(position);
  }
  moveDraggableMax(position) {
    cy.get("[data-cy=draggable-max]").move(position);
  }

  resetDraggableMinMax(){
    cy.get("[data-cy=draggable-min]").move({ deltaX: -250, deltaY: 0 });
    cy.get("[data-cy=draggable-max]").move({ deltaX: 250, deltaY: 0 });
  }
}

export const rangePage = new rangePageClass();
