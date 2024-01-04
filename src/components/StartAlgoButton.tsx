import { useSelectedAlgo } from "@/hooks/AlgoProvider";
import { Button } from "./ui/button";

const StartAlgoButton = () => {
  const { isRunning, runAlgo } = useSelectedAlgo();

  return (
    <Button disabled={isRunning} onClick={runAlgo}>
      Start
    </Button>
  );
};

export default StartAlgoButton;
