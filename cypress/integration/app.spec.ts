/// <reference types="cypress" />

context("E2E", () => {
  it("tests the application", () => {
    // add E2E test commands here
    cy.wrap(true).should("equal", true);
  });

  it("render response from starting message", () => {
    cy.visit("http://localhost:3000");
    cy.get("input").type("Hi UCI", { force: true });
    cy.get("button").click({ force: true });
    cy.wait(1000);
    cy.get("div").contains("Hi! RozgarBot welcomes you!");
  });
});
