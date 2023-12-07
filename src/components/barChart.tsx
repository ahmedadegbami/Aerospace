import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

interface BarChartProps {
  velocity: number;
  altitude: number;
  temperature: number;
  statusMessage: string;
  isAscending: boolean;
  isActionRequired: boolean;
  handleClick?: () => void;
}

const BarChart = ({
  velocity,
  altitude,
  temperature,
  statusMessage,
  isAscending,
  isActionRequired,
  handleClick,
}: BarChartProps) => {
  const data = {
    labels: ["Velocity", "Altitude", "Temperature"],
    datasets: [
      {
        label: "Spectrum Status",
        data: [velocity, altitude, temperature],
        backgroundColor: "blue",
        maxBarThickness: 80,
        borderColor: "red",
      },
    ],
  };

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
      <>
        <Bar
          data={data}
          style={{
            border: "1px solid black",
          }}
        />
        <div>
          <h3>Details:</h3>
          <p>Status: {statusMessage}</p>
          <p>Is Ascending: {`${isAscending}`}</p>
          <p>
            Is Action Required:{" "}
            <span
              style={{ color: isActionRequired ? "red" : "black" }}
            >{`${isActionRequired}`}</span>
          </p>
        </div>
      </>
      {handleClick && (
        <button onClick={handleClick}>Show Current Status</button>
      )}
    </div>
  );
};
export default BarChart;
