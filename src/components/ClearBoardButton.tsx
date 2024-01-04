import { useSelectedAlgo } from "@/hooks/AlgoProvider";
import { Button } from "./ui/button";

const ClearBoardButton = () => {
  const { isRunning } = useSelectedAlgo();
  const resetGrid = () => {
    const tdElements = document.querySelectorAll("td");
    tdElements.forEach((td) => {
      td.className = "";
    });
  };
  return (
    <Button disabled={isRunning} onClick={resetGrid} variant={"outline"}>
      Clear
    </Button>
  );
};

export default ClearBoardButton;
