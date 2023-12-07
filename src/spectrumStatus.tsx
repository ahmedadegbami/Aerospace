import { useEffect, useState } from "react";
import BarChart from "./components/barChart";
import { Chart, registerables } from "chart.js";
import React from "react";
Chart.register(...registerables);

interface SpectrumStatusData {
  velocity: number;
  altitude: number;
  temperature: number;
  statusMessage: string;
  isAscending: boolean;
  isActionRequired: boolean;
}

const SpectrumStatus = () => {
  const [spectrumStatus, setSpectrumStatus] = useState<SpectrumStatusData>();

  const getSpectrumStatus = async () => {
    try {
      const response = await fetch(
        "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/SpectrumStatus"
      );
      if (!response.ok) {
        const errorMessage = `Error: ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
      }
      const data = await response.json();
      setSpectrumStatus(data);
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong");
    }
  };

  useEffect(() => {
    getSpectrumStatus();

    const intervalId = setInterval(() => {
      getSpectrumStatus();
    }, 30000); // 30 secs

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <>
      {spectrumStatus && (
        <BarChart
          velocity={spectrumStatus.velocity}
          altitude={spectrumStatus.altitude}
          temperature={spectrumStatus.temperature}
          statusMessage={spectrumStatus.statusMessage}
          isAscending={spectrumStatus.isAscending}
          isActionRequired={spectrumStatus.isActionRequired}
          handleClick={getSpectrumStatus}
        />
      )}
    </>
  );
};

export default SpectrumStatus;
