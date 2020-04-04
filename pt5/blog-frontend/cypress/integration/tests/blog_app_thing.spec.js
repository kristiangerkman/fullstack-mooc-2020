describe("Note ", function () {
  it("front page can be opened", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Notes");
    cy.contains(
      "Note app, Department of Computer Science, University of Helsinki 2020"
    );
  });
  it("user can login", function () {
    cy.get("input:first").type("mluukkai");
    cy.get("input:last").type("salainen");
  });
});
