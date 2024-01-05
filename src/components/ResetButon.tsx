import { useAlgo } from "@/hooks/AlgoProvider";
import { Button } from "./ui/button";

const ResetButton = () => {
  const { isRunning, initBoard: initPois } = useAlgo();

  return (
    <Button disabled={isRunning} onClick={initPois} variant={"outline"}>
      Clear
    </Button>
  );
};

export default ResetButton;
