describe("Blog app ", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      username: "test",
      name: "test",
      password: "test",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("user can login", function () {
    cy.get("#username").type("test");
    cy.get("#password").type("test");
    cy.get("#login-button").click();
    cy.contains("Logged in as test");
  });

  describe.only("When logged in", function () {
    beforeEach(function () {
      cy.visit("http://localhost:3000");
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();
    });

    it("Create new blog", function () {
      cy.contains("Create new blog").click();
      cy.get("#title").type("test.title");
      cy.get("#author").type("test.author");
      cy.get("#url").type("test.url");

      cy.get("#submit-new-blog").click();
      cy.contains('a new blog "test.title" by test.author added');
      cy.contains("test.title by test.author");
    });
    describe.only("With blog post", function () {
      beforeEach(function () {
        cy.contains("Create new blog").click();
        cy.get("#title").type("test.title");
        cy.get("#author").type("test.author");
        cy.get("#url").type("test.url");
        cy.get("#submit-new-blog").click();
      });

      it("Can like post", function () {
        cy.contains("Show").click();
        cy.contains("Likes 0");
        cy.get("#like-button").click();
        cy.contains("Likes 1");
      });

      it("Delete post", function () {
        cy.contains("Show").click();
        cy.contains("Delete").click();
        cy.contains("No blog posts yet");
      });
    });
    // TODO fk this :DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD

    it("Check blogs like order", function () {
      cy.contains("Create new blog").click();
      cy.get("#title").type("test.title 1");
      cy.get("#author").type("test.author 1");
      cy.get("#url").type("test.url");
      cy.get("#submit-new-blog").click();
    });
  });
});
