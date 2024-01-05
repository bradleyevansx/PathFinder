import { useAlgo } from "@/hooks/AlgoProvider";
import { Button } from "./ui/button";

const ClearBoardButton = () => {
  const { isRunning, initPois } = useAlgo();

  return (
    <Button disabled={isRunning} onClick={initPois} variant={"outline"}>
      Clear
    </Button>
  );
};

export default ClearBoardButton;
