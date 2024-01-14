import AddPatient from "./AddPatient";
import AlgoSelect from "./AlgoSelect";
import ClearPathButton from "./ClearPathButton";
import MazeSelect from "./MazeSelect";
import ResetButton from "./ResetButon";
import SpeedSelect from "./SpeedSelect";
import StartButton from "./StartButton";

const AlgoOptions = () => {
  return (
    <div className="flex gap-3">
      <AddPatient></AddPatient>
      <MazeSelect></MazeSelect>
      <AlgoSelect></AlgoSelect>
      <SpeedSelect></SpeedSelect>
      <ClearPathButton></ClearPathButton>
      <ResetButton></ResetButton>
      <StartButton></StartButton>
    </div>
  );
};

export default AlgoOptions;
