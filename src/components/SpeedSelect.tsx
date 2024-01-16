import { Speed, useAlgo } from "@/hooks/AlgoProvider";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SpeedSelect = () => {
  const { speed, setSpeed, isRunning } = useAlgo();
  const handleChange = (value: string) => {
    setSpeed(Speed[value as keyof typeof Speed]);
  };
  return (
    <Select
      disabled={isRunning}
      value={speed.toString()}
      onValueChange={handleChange}
    >
      <SelectTrigger className="w-[100px]" defaultValue={"Fast"}>
        <SelectValue placeholder="Select Speed" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Speeds</SelectLabel>
          <SelectItem value="VeryFast">Very Fast</SelectItem>
          <SelectItem value="Fast">Fast</SelectItem>
          <SelectItem value="Average">Average</SelectItem>
          <SelectItem value="Slow">Slow</SelectItem>
          <SelectItem value="VerySlow">Very Slow</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SpeedSelect;
