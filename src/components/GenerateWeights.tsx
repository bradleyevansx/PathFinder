import { useAlgo } from "@/hooks/AlgoProvider";
import { Button } from "./ui/button";

const GenerateWeights = () => {
  const { isRunning, boardIsFresh } = useAlgo();

  const generateWeights = () => {
    for (let row = 0; row < 25; row++) {
      for (let col = 0; col < 25; col++) {
        const cell = document.getElementById(`${col}-${row}`);

        if (
          !cell?.classList.contains("wall") &&
          cell?.childElementCount === 0 &&
          Math.random() < 0.1
        ) {
          cell?.classList.add("weight");
        }
      }
    }
  };

  return (
    <Button onClick={generateWeights} disabled={isRunning || !boardIsFresh}>
      Weights
    </Button>
  );
};

export default GenerateWeights;
