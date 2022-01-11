/// <reference types="Cypress" />
import { rangePage } from "../../page-objects";

describe("Range component of Exercise 1", () => {
  it("Should display page Exercise1", () => {
    rangePage.openExercise1();
    rangePage.exercise1Title.should("be.visible");
    rangePage.exercise1Title.should("contain.text", "Exercise 1");
  });
  it("Page Exercise1 should display 'back to home' link", () => {
    rangePage.openExercise1();
    rangePage.backToHome.should("be.visible");
    rangePage.backToHome.should("contain.text", "Back to Home");
  });
  it("The user can type on both currency number label values (min or max) and set a new value.", () => {
    rangePage.minInput.should("not.be.disabled");
    rangePage.maxInput.should("not.be.disabled");
    rangePage.fillMinInput(200);
    rangePage.fillMaxInput(2000);
    rangePage.minInput.should("have.value", 200);
    rangePage.maxInput.should("have.value", 2000);
  });
  it("When user types a number less than 'min' value on 'min' input should transform it at minimum value", () => {
    rangePage.fillMinInput(-10);
    rangePage.minInput.should("have.value", rangePage.minValue);
  });
  it("When user types a number over than 'max' value on 'min' input should transform it at max value less 200", () => {
    rangePage.fillMaxInput(rangePage.maxValue);
    rangePage.fillMinInput(rangePage.maxValue * 2);
    rangePage.minInput.should("have.value", 9800);
  });
  it("When user types a number less than 'min' value on 'max' input should transform it at minimum value more 200", () => {
    rangePage.fillMinInput(rangePage.minValue);
    rangePage.fillMaxInput(rangePage.maxValue * -1);
    rangePage.maxInput.should("have.value", 201);
  });
  it("When user types a number over than 'max' value on 'max' input should transform it at max value", () => {
    rangePage.fillMaxInput(rangePage.maxValue * 2);
    rangePage.maxInput.should("have.value", rangePage.maxValue);
  });
});
