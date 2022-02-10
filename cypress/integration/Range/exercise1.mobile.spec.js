/// <reference types="Cypress" />
import { rangePage } from "../../page-objects";

describe(
  "Range component of Exercise 1 on Mobile version (iPad Mini)",
  {
    viewportWidth: 768,
    viewportHeight: 1024,
  },
  () => {
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
      rangePage.fillMaxInput(1000);
      rangePage.minInput.should("have.value", 200);
      rangePage.maxInput.should("have.value", rangePage.maxValue);
    });
    it("When user types a number less than 'min' value on 'min' input should transform it at minimum value", () => {
      rangePage.fillMinInput(-1);
      rangePage.minInput.should("have.value", rangePage.minValue);
    });
    it("When user types a number over than 'max' value on 'min' input it should transform it at max value less calculated margin", () => {
      rangePage.fillMaxInput(rangePage.maxValue);
      rangePage.fillMinInput(rangePage.maxValue * 2);

      rangePage.minInput.invoke("val").should((minInputValue) => {
        expect(Number(minInputValue)).to.be.lessThan(rangePage.maxValue);
      });
    });
    it("When user types a number less than 'min' value on 'max' input it should transform it at minimum value more calculated margin", () => {
      rangePage.fillMinInput(rangePage.minValue);
      rangePage.fillMaxInput(rangePage.maxValue * -1);

      rangePage.maxInput.invoke("val").should((maxInputValue) => {
        expect(Number(maxInputValue)).to.be.greaterThan(rangePage.minValue);
      });
    });
    it("When user types a number over than 'max' value on 'max' input should transform it at max value", () => {
      rangePage.fillMaxInput(rangePage.maxValue * 2);
      rangePage.maxInput.should("have.value", rangePage.maxValue);
    });
  }
);
