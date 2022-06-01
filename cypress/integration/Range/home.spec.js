/// <reference types="Cypress" />
import { rangePage } from "../../page-objects";

describe("Links exercise 1", () => {
  it("should link to exercise1 page", () => {
    rangePage.open();
    rangePage.exercise1Link.should("be.visible");
    rangePage.exercise1Link.should("have.attr", "href", "/exercise1");
  });
});

describe("Links exercise 2", () => {
  it("should link to exercise2 page", () => {
    rangePage.open();
    rangePage.exercise2Link.should("be.visible");
    rangePage.exercise2Link.should("have.attr", "href", "/exercise2");
  });
});
