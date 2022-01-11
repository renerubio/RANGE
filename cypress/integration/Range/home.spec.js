/// <reference types="Cypress" />
import { homePage } from "../../page-objects";

describe("Links exercise 1", () => {
  it("should link to exercise1 page", () => {
    homePage.open();
    homePage.exercise1Link.should("be.visible");
    homePage.exercise1Link.should("have.attr", "href", "/exercise1");
  });
});

describe("Links exercise 2", () => {
  it("should link to exercise2 page", () => {
    homePage.open();
    homePage.exercise2Link.should("be.visible");
    homePage.exercise2Link.should("have.attr", "href", "/exercise2");
  });
});