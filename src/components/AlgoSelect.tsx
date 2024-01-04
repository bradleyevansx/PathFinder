import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Algo, useAlgo } from "@/hooks/AlgoProvider";

const AlgoSelect = () => {
  const { algo, setAlgo, isRunning } = useAlgo();
  const handleChange = (value: string) => {
    setAlgo(Algo[value as keyof typeof Algo]);
  };
  return (
    <Select
      disabled={isRunning}
      value={algo.toString()}
      onValueChange={handleChange}
    >
      <SelectTrigger className="w-[180px]" defaultValue={"DepthFirstSearch"}>
        <SelectValue placeholder="Select Algorithm" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Algorithms</SelectLabel>
          <SelectItem value="DepthFirstSearch">Depth First Search</SelectItem>
          <SelectItem value="BreadthFirstSearch">
            Breadth First Search
          </SelectItem>
          <SelectItem value="Dijkstra">Dijkstra</SelectItem>
          <SelectItem value="AStar">A*</SelectItem>
          <SelectItem value="Greedy">Greedy</SelectItem>
          <SelectItem value="Swarm">Swarm</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AlgoSelect;
