import { Algo, useAlgo } from "@/hooks/AlgoProvider";
import { Card, CardContent } from "./ui/card";

const LeftSideContainer = () => {
  const { algo, algoStats } = useAlgo();

  const algoMessage = (): string => {
    let message;
    switch (algo) {
      case Algo.Dijkstra:
        message =
          "Dijkstra's algorithm is a weighted graph search algorithm that guarantees finding the shortest path between two nodes in a graph with non-negative weights.";
        break;
      case Algo.DepthFirstSearch:
        message =
          "DFS is a graph traversal algorithm that explores as far as possible along each branch in the decision tree before backtracking. It does not take edge weights into account and does not guarantee finding the shortest path between nodes.";
        break;
      case Algo.BreadthFirstSearch:
        message =
          "BFS is a graph traversal algorithm that explores nodes level by level, visiting all neighbors before moving on to the next level. While BFS guarantees finding the shortest path in an unweighted graph, it may not do so in a weighted graph.";
        break;
      case Algo.AStar:
        message =
          "A* is a heuristic search algorithm that combines the systematic exploration of paths with a heuristic function to guide its search towards the most promising nodes. Similar to DFS, it may not consider edge weights explicitly and may explore less promising paths before finding the optimal solution. However, A* is more efficient in finding optimal paths in graphs with weighted edges.";
        break;
    }
    return message!;
  };
  return (
    <div className="hidden md:flex flex-col gap-4 ">
      <Card className=" w-72 h-fit">
        <CardContent className="mt-6 flex flex-col items-center">
          <h3 className=" text-2xl border-b mb-2">Algorithm Details</h3>
          <p className="text-sm">{algoMessage()}</p>
        </CardContent>
      </Card>
      {algoStats && (
        <Card className=" w-72 h-fit">
          <CardContent className="mt-6 flex flex-col items-center">
            {algoStats.isSuccess ? (
              <>
                <h3 className=" text-2xl border-b mb-2">Stats</h3>

                <p>{`Length of path found: ${algoStats.length}`}</p>
                <p>{`Time taken: ${algoStats.duration} ms`}</p>
              </>
            ) : (
              <p className="text-red">No valid path found.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LeftSideContainer;
