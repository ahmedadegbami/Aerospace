import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

interface SpectrumStatusData {
  velocity: number;
  altitude: number;
  temperature: number;
  statusMessage: string;
  isAscending: boolean;
  isActionRequired: boolean;
}

function App() {
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

  const data = {
    labels: ["Velocity", "Altitude", "Temperature"],
    datasets: [
      {
        label: "Spectrum Status",
        data: [
          `${spectrumStatus?.velocity}`,
          `${spectrumStatus?.altitude}`,
          `${spectrumStatus?.temperature}`,
        ],
        backgroundColor: "blue",
        maxBarThickness: 80,
        borderColor: "red",
      },
    ],
  };

  useEffect(() => {
    getSpectrumStatus();

    const intervalId = setInterval(() => {
      getSpectrumStatus();
    }, 30000); // it refresh every 30 secs

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "50%",
      }}
    >
      <h2>Spectrum Data Visualization</h2>
      {spectrumStatus && (
        <>
          <Bar
            data={data}
            style={{
              border: "1px solid black",
            }}
          />
          <div>
            <h3>Details:</h3>
            <p>Status: {`${spectrumStatus.statusMessage}`}</p>
            <p>Is Ascending: {`${spectrumStatus.isAscending}`}</p>
            <p>Is Action Required: {`${spectrumStatus.isActionRequired}`}</p>
          </div>
        </>
      )}

      <button onClick={() => getSpectrumStatus()}>Show Current Status</button>
    </div>
  );
}

export default App;
