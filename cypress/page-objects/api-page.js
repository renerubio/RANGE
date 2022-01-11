class apiPageClass {
  get getRange() {
    return cy.request({
      method: "GET",
      url: "https://demo4866084.mockable.io/range",
    });
  }

  get getRangeValues() {
    return cy.request({
      method: "GET",
      url: "https://demo4866084.mockable.io/rangeValues",
    });
  }

}

export const apiPage = new apiPageClass();
