/// <reference types="Cypress" />
import "@4tw/cypress-drag-drop";
import { rangePage } from "../../page-objects";

describe("Range component of Exercise 2", () => {
  it("Should display page Exercise2", () => {
    rangePage.openExercise2();
    rangePage.exercise2Title.should("be.visible");
    rangePage.exercise2Title.should("contain.text", "Exercise 2");
  });
  it("Page Exercise2 should display 'back to home' link", () => {
    rangePage.openExercise2();
    rangePage.backToHome.should("be.visible");
    rangePage.backToHome.should("contain.text", "Back to Home");
  });

  it("When user drag the bullet1 to last right position, should display '50.99' on 'min' input and '70.99' on 'max' input", () => {
    rangePage.resetDraggableMinMax();
    rangePage.moveDraggableMin({ deltaX: 394, deltaY: 0 });
    rangePage.minInput().should("have.value", 50.99);
    rangePage.maxInput().should("have.value", 70.99);
  });

  it("When user drag the bullet2 to firts left position, should display '5.99' on 'max' input and '1.99' on 'min' input", () => {
    rangePage.resetDraggableMinMax();
    rangePage.moveDraggableMax({ deltaX: 131, deltaY: 0 });
    rangePage.minInput().should("have.value", 1.99);
    rangePage.maxInput().should("have.value", 5.99);
  });

  it("When user drag the bullet1 one step to right, should display '5.99' on 'min' input", () => {
    rangePage.resetDraggableMinMax();
    rangePage.moveDraggableMin({ deltaX: 160, deltaY: 0 });
    rangePage.minInput().should("have.value", 5.99);
  });
  it("When user drag the bullet2 two steps to left, should display '30.99' on 'max' input", () => {
    rangePage.resetDraggableMinMax();
    rangePage.moveDraggableMax({ deltaX: 310, deltaY: 0 });
    rangePage.maxInput().should("have.value", 30.99);
  });
  it("Min value and max value can't be crossed in range", () => {
    rangePage.resetDraggableMinMax();
    rangePage.moveDraggableMax({ deltaX: 220, deltaY: 0 });
    rangePage.maxInput().should("have.value", 10.99);
    rangePage.moveDraggableMin({ deltaX: 290, deltaY: 0 });
    rangePage.minInput().should("have.value", 5.99);
    rangePage.moveDraggableMax({ deltaX: 170, deltaY: 0 });
    rangePage.maxInput().should("have.value", 10.99);
  });
});
