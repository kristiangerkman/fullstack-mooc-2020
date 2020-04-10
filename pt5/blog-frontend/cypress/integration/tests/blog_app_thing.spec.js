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
    describe.only("create new blog", function () {
      it("Create new blog", function () {
        cy.contains("Create new blog").click();
        cy.get("#title").type("test.title");
        cy.get("#author").type("test.author");
        cy.get("#url").type("test.url");

        cy.get("#submit-new-blog").click();
        cy.contains('a new blog "test.title" by test.author added');
        cy.contains("test.title by test.author");
      });
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
    describe.only("Check blogs like order", function () {
      it("Check blogs like order", function () {
        cy.contains("Create new blog").click();
        cy.get("#title").type("test.title 1");
        cy.get("#author").type("test.author 1");
        cy.get("#url").type("test.url 1");
        cy.get("#submit-new-blog").click();
        cy.wait(2000);
        cy.get("#title").type("test.title 2");
        cy.get("#author").type("test.author 2");
        cy.get("#url").type("test.url 2");
        cy.get("#submit-new-blog").click();
        cy.wait(2000);
        cy.get("#title").type("test.title 3");
        cy.get("#author").type("test.author 3");
        cy.get("#url").type("test.url 3");
        cy.get("#submit-new-blog").click();
        cy.wait(2000);
        cy.contains("test.title 1 by")
          .parent()
          .find("#show-button")
          .as("showButton1");
        cy.contains("test.title 2 by")
          .parent()
          .find("#show-button")
          .as("showButton2");
        cy.contains("test.title 3 by")
          .parent()
          .find("#show-button")
          .as("showButton3");

        cy.get("@showButton1").click();
        cy.get("@showButton2").click();
        cy.get("@showButton3").click();

        cy.contains("test.title 1 by")
          .parent()
          .find("#hide-button")
          .as("hideButton1");
        cy.contains("test.title 2 by")
          .parent()
          .find("#hide-button")
          .as("hideButton2");
        cy.contains("test.title 3 by")
          .parent()
          .find("#hide-button")
          .as("hideButton3");

        cy.contains("test.title 1 by")
          .parent()
          .find("#like-button")
          .as("likeButton1");
        cy.contains("test.title 2 by")
          .parent()
          .find("#like-button")
          .as("likeButton2");
        cy.contains("test.title 3 by")
          .parent()
          .find("#like-button")
          .as("likeButton3");

        cy.get("@likeButton3").click();
        cy.wait(500);
        cy.get("@likeButton3").click();
        cy.wait(500);
        cy.get("@likeButton3").click();
        cy.wait(500);
        cy.get("@likeButton2").click();
        cy.wait(500);
        cy.get("@likeButton2").click();
        cy.wait(500);
        cy.get("@likeButton1").click();
        cy.wait(500);

        cy.get("@hideButton1").click();
        cy.get("@hideButton2").click();
        cy.get("@hideButton3").click();

        cy.get(":nth-child(1) > #blogs-container").should(
          "contain",
          "test.title 3"
        );
        cy.get(":nth-child(2) > #blogs-container").should(
          "contain",
          "test.title 2"
        );
        cy.get(":nth-child(3) > #blogs-container").should(
          "contain",
          "test.title 1"
        );
      });
    });
  });
});
