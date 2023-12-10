import { SpectrumStatusData } from "../../src/spectrumStatus";

const expectedProperties = [
  "velocity",
  "altitude",
  "temperature",
  "statusMessage",
  "isAscending",
  "isActionRequired",
];

describe("API Status Test", () => {
  it("should retrieve Spectrum Status dada from API", () => {
    cy.request(
      "GET",
      "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus"
    ).then((response: { status: number; body: SpectrumStatusData }) => {
      expect(response.status).to.eq(200);

      expectedProperties.forEach((property) => {
        expect(response.body).to.have.property(property);
      });
    });
  });

  it("should handle WebSocket data", () => {
    cy.window().then((win) => {
      const socket = new win.WebSocket(
        "wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS"
      );

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        expectedProperties.forEach((property) => {
          const formattedProperty =
            property.charAt(0).toUpperCase + property.slice(1);
          expect(data).to.have.property(formattedProperty);
        });
      };
    });
  });
});
