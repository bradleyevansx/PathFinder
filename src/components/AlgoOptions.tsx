import AddPatient from "./AddPatient";
import AlgoSelect from "./AlgoSelect";

const AlgoOptions = () => {
  return (
    <div className="flex gap-3">
      <AddPatient></AddPatient>
      <AlgoSelect></AlgoSelect>
    </div>
  );
};

export default AlgoOptions;
