import React, { useEffect, useState } from "react";
import BarChart from "./components/barChart";
import { useNavigate } from "react-router-dom";
import AlertMessage from "./alertMessage";

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
  const [instructions, setInstructions] = useState<string>("");

  const navigate = useNavigate();

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

  const handleAction = async () => {
    try {
      await fetch(
        "https://webfrontendassignment-isaraerospace.azurewebsites.net/api/ActOnSpectrum",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ instructions }),
        }
      );
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInstructions(event.target.value);
  };

  return (
    <>
      {spectrumWS && (
        <>
          <BarChart
            velocity={spectrumWS.Velocity}
            altitude={spectrumWS.Altitude}
            temperature={spectrumWS.Temperature}
            statusMessage={spectrumWS.StatusMessage}
            isAscending={spectrumWS.IsAscending}
            isActionRequired={spectrumWS.IsActionRequired}
          />
          {spectrumWS.IsActionRequired && (
            <AlertMessage
              handleAction={handleAction}
              handleTextareaChange={handleTextareaChange}
            />
          )}
        </>
      )}
    </>
  );
};

export default SpectrumWS;
