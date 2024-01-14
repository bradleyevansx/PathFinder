import { Algo } from "@/hooks/AlgoProvider";

interface Props {
  algo: Algo;
}

const AlgoDesc = ({ algo }: Props) => {
  const desc = () => {
    let selectedAlgo;
    let description;
    switch (algo) {
      case Algo.DepthFirstSearch:
        selectedAlgo = "Depth First Search:";
        description =
          "Does not guarantee the shortest path or take weights into account.";
        break;
      case Algo.BreadthFirstSearch:
        selectedAlgo = "Breadth First Search:";
        description =
          "Guarantees the shortest path but does not take weights into account.";
        break;
      case Algo.Dijkstra:
        selectedAlgo = "Dijksra";
        description = "Guarantees the shortest path and considers weights.";
        break;
      case Algo.AStar:
        selectedAlgo = "A Star";
        description =
          "Guarantees the shortest path and incorporates heuristic functions.";
        break;
      case Algo.Greedy:
        selectedAlgo = "Greedy";
        description =
          "Prioritizes the most promising path without considering future steps.";
        break;
      case Algo.Swarm:
        selectedAlgo = "Swarm";
        description = "Utilizes swarm intelligence principles for pathfinding.";
    }
    return { selectedAlgo, description };
  };

  return (
    <div className="flex flex-col">
      <p className="text-xs font-bold">{desc().selectedAlgo}</p>
      <p className="text-xs">{desc().description}</p>
    </div>
  );
};

export default AlgoDesc;
