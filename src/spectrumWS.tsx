import React, { useEffect, useState } from "react";
import BarChart from "./components/barChart";

export interface SpectrumWSData {
  Velocity: number;
  Altitude: number;
  Temperature: number;
  StatusMessage: string;
  IsAscending: boolean;
  IsActionRequired: boolean;
}

const SpectrumWS = () => {
  const [spectrumWS, setSpectrumWS] = useState<SpectrumWSData>();

  useEffect(() => {
    const socket = new WebSocket(
      "wss://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumWS"
    );

    socket.onopen = (event) => {
      socket.send(JSON.stringify(event));
    };

    socket.onmessage = function (event) {
      const data = JSON.parse(event.data);
      try {
        if ((data.event = "data")) {
          setSpectrumWS(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  if (spectrumWS && spectrumWS.IsActionRequired) {
    alert("Action is required");
  }

  return (
    <>
      {spectrumWS && (
        <BarChart
          velocity={spectrumWS.Velocity}
          altitude={spectrumWS.Altitude}
          temperature={spectrumWS.Temperature}
          statusMessage={spectrumWS.StatusMessage}
          isAscending={spectrumWS.IsAscending}
          isActionRequired={spectrumWS.IsActionRequired}
        />
      )}
    </>
  );
};

export default SpectrumWS;
