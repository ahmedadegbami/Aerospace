const testCases = [
  {
    testId: "main-title",
    title: "Assignment from Isar Aerospace",
  },
  {
    testId: "status-title",
    title: "Spectrum Status",
    redirectUrl: "/spectrumStatus",
  },
  {
    testId: "wb-title",
    title: "Spectrum Web Socket",
    redirectUrl: "/spectrumWS",
  },
  {
    testId: "comment-title",
    title: "Comment for Improvement",
    redirectUrl: "/comments",
  },
];

describe("Home page functionality", () => {
  it("should successfully load the home page and redirect on clickable title click", () => {
    cy.visit("http://localhost:3000/");

    for (const test of testCases) {
      if (test.redirectUrl) {
        cy.get(`[data-testid=${test.testId}]`)
          .should("exist")
          .should("have.text", `${test.title}`)
          .click();

        cy.url().should("include", test.redirectUrl);
        cy.go("back");
      } else {
        cy.get(`[data-testid=${test.testId}]`)
          .should("exist")
          .should("have.text", `${test.title}`);
      }
    }
  });
});
