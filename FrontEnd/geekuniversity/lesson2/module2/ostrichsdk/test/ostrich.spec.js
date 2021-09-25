import Ostrich from "../src/index.js";
import cy from "cypress";
import path from "path";

console.log(cy);

/**
 * @jest-environment jsdom
 */
describe("ostrich test", () => {
  it("ostrich", () => {
    cy.visit(path.join(__dirname, "index.html"));
  });

  it("ostrich2", () => {
    expect("1").toBe("1");
  });
});
