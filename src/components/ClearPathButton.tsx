import { Button } from "./ui/button";
import { useAlgo } from "@/hooks/AlgoProvider";

const ClearPathButton = () => {
  const { isRunning, clearPath } = useAlgo();

  return (
    <Button disabled={isRunning} onClick={clearPath}>
      Clear Path
    </Button>
  );
};

export default ClearPathButton;
