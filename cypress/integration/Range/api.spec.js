/// <reference types="Cypress" />
import { apiPage } from "../../page-objects/";

describe("API REST rangeValues endpoint", () => {
  let res = {};
  before(() => apiPage.getRangeValues.then((result) => (res = result)));
  it("should return 6 values", () => {
    expect(res.body.rangeValues.length).to.eq(6);
  });
});

describe("API REST range endpoint", () => {
  let res = {};
  before(() => apiPage.getRange.then((result) => (res = result)));
  it("should contain 'min' and 'max' properties", () => {
    expect(res.body).to.have.property("min");
    expect(res.body).to.have.property("max");
  });
});
