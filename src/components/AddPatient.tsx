import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useAlgo } from "@/hooks/AlgoProvider";

const AddPatient = () => {
  const { isRunning, boardIsFresh } = useAlgo();
  const [patientExists, setPatientExists] = useState(false);

  useEffect(() => {
    if (boardIsFresh) {
      setPatientExists(false);
    }
  }, [boardIsFresh]);

  const handleAddPatient = () => {
    const tdElements = document.querySelectorAll(
      "td:not(.start):not(.end):not(.wall)"
    );
    const randomIndex = Math.floor(Math.random() * tdElements.length);
    const randomTd = tdElements[randomIndex];

    var injured = document.getElementById("injured");

    if (injured) {
      injured.style.display = "flex";
      randomTd.appendChild(injured);
    }
    setPatientExists(true);
  };

  const handleRemovePatient = () => {
    var injured = document.getElementById("injured");
    var poiContainer = document.getElementById("interest-container");

    if (injured && poiContainer) {
      poiContainer.appendChild(injured);
    }
    setPatientExists(false);
  };

  return (
    <div>
      {patientExists ? (
        <Button
          disabled={isRunning || !boardIsFresh}
          variant={"outline"}
          onClick={handleRemovePatient}
        >
          Remove Patient
        </Button>
      ) : (
        <Button
          disabled={isRunning || !boardIsFresh}
          variant={"outline"}
          onClick={handleAddPatient}
        >
          Add Patient
        </Button>
      )}
    </div>
  );
};

export default AddPatient;
