import { useAlgo } from "@/hooks/AlgoProvider";
import { Button } from "./ui/button";

const StartAlgoButton = () => {
  const { isRunning, runAlgo, boardIsFresh } = useAlgo();

  return (
    <Button disabled={isRunning || !boardIsFresh} onClick={runAlgo}>
      Start
    </Button>
  );
};

export default StartAlgoButton;
