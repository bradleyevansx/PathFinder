import { useAlgo } from "@/hooks/AlgoProvider";
import { Button } from "./ui/button";

const StartButton = () => {
  const { isRunning, runAlgo, boardIsFresh } = useAlgo();

  return (
    <Button
      variant={"outline"}
      disabled={isRunning || !boardIsFresh}
      onClick={runAlgo}
    >
      Start
    </Button>
  );
};

export default StartButton;
