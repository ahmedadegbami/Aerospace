describe("Page data rendering", () => {
  it("displays sprectrum data", () => {
    cy.fixture("spectrumStatus.json").then((mockedData) => {
      cy.intercept(
        "GET",
        "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus",
        mockedData
      ).as("getSpectrumStatus");

      cy.visit("http://localhost:3000/spectrumStatus");

      cy.wait("@getSpectrumStatus").then(() => {
        cy.contains(mockedData.statusMessage).should("be.visible");
      });

      cy.visit("http://localhost:3000/spectrumWS");

      cy.wait("@getSpectrumStatus").then(() => {
        cy.contains(mockedData.statusMessage).should("be.visible");
      });
    });
  });
});
