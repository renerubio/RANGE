import "@4tw/cypress-drag-drop";
import test_en from "../../src/resources/en/global.json";

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
    return cy.get(`[aria-label="${test_en.nav["aria-link-exercise-1"]}"]`);
  }

  get exercise2Link() {
    return cy.get(`[aria-label="${test_en.nav["aria-link-exercise-2"]}"]`);
  }

  get exercise1Title() {
    return cy.get(`[aria-label="${test_en.header["exercise-1"]}"]`);
  }

  get exercise2Title() {
    return cy.get(`[aria-label="${test_en.header["exercise-2"]}"]`);
  }

  get backToHome() {
    return cy.get(`[aria-label="${test_en.nav["back-to-home"]}"]`);
  }

  get minValue() {
    return 1;
  }

  get maxValue() {
    return 10000;
  }

  minInput() {
    return cy.get("[data-cy=minInput]");
  }

  fillMinInput(value) {
    const minField = this.minInput();
    minField.type("{selectall}").type(value);
  }

  maxInput() {
    return cy.get("[data-cy=maxInput]");
  }

  fillMaxInput(value) {
    const maxField = this.maxInput();
    maxField.type("{selectall}").type(value);
  }

  draggableMin() {
    return cy.get("[data-cy=draggable-min]");
  }

  draggableMax() {
    return cy.get("[data-cy=draggable-max]");
  }

  moveDraggableMin(position) {
    this.draggableMin().trigger("mousedown", position);
    this.draggableMin().trigger("mousemove", position);
    this.draggableMin().trigger("mouseup");
  }

  moveDraggableMax(position) {
    this.draggableMax().trigger("mousedown", position);
    this.draggableMax().trigger("mousemove", position);
    this.draggableMax().trigger("mouseup");
  }

  resetDraggableMinMax() {
    this.draggableMin().trigger("mousedown", {
      deltaX: 131,
      deltaY: 0,
    });
    this.draggableMin().trigger("mousemove", {
      deltaX: 131,
      deltaY: 0,
    });
    this.draggableMin().trigger("mouseup");
    this.draggableMax().trigger("mousedown", {
      deltaX: 480,
      deltaY: 0,
    });
    this.draggableMax().trigger("mousemove", {
      deltaX: 480,
      deltaY: 0,
    });
    this.draggableMax().trigger("mouseup");
  }

  // Mobile

  moveDraggableMobileMin(position) {
    this.draggableMin().trigger("touchmove", position);
    this.draggableMin().trigger("touchend", position);
  }

  moveDraggableMobileMax(position) {
    this.draggableMax().trigger("touchmove", position);
    this.draggableMax().trigger("touchend", position);
  }

  resetDraggableMobileMinMax() {
    this.draggableMin().trigger("touchmove", 131, 0, {
      changedTouches: [{ clientX: 131, clientY: 0 }],
    });
    this.draggableMin().trigger("touchend");
    this.draggableMax().trigger("touchmove", 480, 0, {
      changedTouches: [{ clientX: 480, clientY: 0 }],
    });
    this.draggableMax().trigger("touchend");
  }
}

export const rangePage = new rangePageClass();
