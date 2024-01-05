import AddPatient from "./AddPatient";
import AlgoSelect from "./AlgoSelect";
import MazeSelect from "./MazeSelect";
import SpeedSelect from "./SpeedSelect";

const AlgoOptions = () => {
  return (
    <div className="flex gap-3">
      <AddPatient></AddPatient>
      <MazeSelect></MazeSelect>
      <AlgoSelect></AlgoSelect>
      <SpeedSelect></SpeedSelect>
    </div>
  );
};

export default AlgoOptions;
