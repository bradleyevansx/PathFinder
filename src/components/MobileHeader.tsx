import AddPatient from "./AddPatient";
import ClearPathButton from "./ClearPathButton";
import MazeSelect from "./MazeSelect";
import ResetButton from "./ResetButon";
import SelectsModal from "./SelectsModal";
import StartButton from "./StartButton";
import { Card, CardContent } from "./ui/card";

const MobileHeader = () => {
  return (
    <Card className="flex md:hidden flex-col w-fit">
      <CardContent className="m-5 w-fit p-0 gap-3 flex-col flex justify-center items-center">
        <h1 className="text-lg font-bold m-0 w-fit border-b">
          Path Finding Algorithm Visualizer
        </h1>
        <div className="flex justify-center gap-3">
          <SelectsModal></SelectsModal>
          <AddPatient></AddPatient>
          <MazeSelect></MazeSelect>
        </div>
        <div className="flex justify-center gap-3">
          <ClearPathButton></ClearPathButton>
          <ResetButton></ResetButton>
          <StartButton></StartButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileHeader;
