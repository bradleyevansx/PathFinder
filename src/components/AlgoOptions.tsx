import AddPatient from "./AddPatient";
import AlgoSelect from "./AlgoSelect";
import SpeedSelect from "./SpeedSelect";

const AlgoOptions = () => {
  return (
    <div className="flex gap-3">
      <AddPatient></AddPatient>
      <AlgoSelect></AlgoSelect>
      <SpeedSelect></SpeedSelect>
    </div>
  );
};

export default AlgoOptions;
