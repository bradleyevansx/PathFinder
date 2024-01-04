import { useState } from "react";
import { Button } from "./ui/button";
import { useSelectedAlgo } from "@/hooks/AlgoProvider";

const AddPatient = () => {
  const { isRunning } = useSelectedAlgo();
  const [patientExists, setPatientExists] = useState(false);

  const handleAddPatient = () => {
    setPatientExists(true);
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
  };

  const handleRemovePatient = () => {
    setPatientExists(false);
    var injured = document.getElementById("injured");
    var poiContainer = document.getElementById("interest-container");

    if (injured && poiContainer) {
      poiContainer.appendChild(injured);
    }
  };

  return (
    <div>
      {patientExists ? (
        <Button
          disabled={isRunning}
          variant={"outline"}
          onClick={handleRemovePatient}
        >
          Remove Patient
        </Button>
      ) : (
        <Button
          disabled={isRunning}
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
