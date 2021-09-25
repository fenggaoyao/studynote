import path from "path";
/// <reference types="cypress" />

describe("sdk test", () => {
  beforeEach(() => {
    cy.visit(path.join(__dirname, "index.html"));
  });

  it("displays two todo items by default", () => {
    cy.get(".todo-list li").should("have.length", 2);
  });
});
