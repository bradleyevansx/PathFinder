import { createContext, useContext, useState } from "react";

export enum Algo {
  DepthFirstSearch = "DepthFirstSearch",
  BreadthFirstSearch = "BreadthFirstSearch",
  Dijkstra = "Dijkstra",
  AStar = "AStar",
  Greedy = "Greedy",
  Swarm = "Swarm",
}

type AlgoProviderProps = {
  children: React.ReactNode;
  defaultAlgo?: Algo;
};

type AlgoProviderState = {
  runAlgo: () => void;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  algo: Algo;
  setAlgo: (algo: Algo) => void;
};

const initialState: AlgoProviderState = {
  runAlgo: () => null,
  isRunning: false,
  setIsRunning: () => null,
  algo: Algo.DepthFirstSearch,
  setAlgo: () => null,
};

const AlgoProviderContext = createContext<AlgoProviderState>(initialState);

export function AlgoProvider({
  children,
  defaultAlgo = Algo.DepthFirstSearch,
  ...props
}: AlgoProviderProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [algo, setAlgo] = useState<Algo>(Algo.DepthFirstSearch);

  const value = {
    runAlgo: async () => {
      setIsRunning(true);
      await search(algo);
      setIsRunning(false);
    },
    isRunning,
    setIsRunning,
    algo,
    setAlgo: (algo: Algo) => {
      setAlgo(algo);
    },
  };

  return (
    <AlgoProviderContext.Provider {...props} value={value}>
      {children}
    </AlgoProviderContext.Provider>
  );
}

export const useSelectedAlgo = () => {
  const context = useContext(AlgoProviderContext);

  if (context === undefined)
    throw new Error("useSelectedAlgo must be used within a AlgoProvider");

  return context;
};
async function search(algo: Algo) {
  const startPoi = document.getElementById("start")?.parentElement?.id;
  const endPoi = document.getElementById("end")?.parentElement?.id;
  let selectedAlgo;
  switch (algo) {
    case Algo.DepthFirstSearch:
      selectedAlgo = dfs;
      break;
    case Algo.BreadthFirstSearch:
      selectedAlgo = bfs;
      break;
    // case Algo.Dijkstra:
    //   selectedAlgo = dijkstra;
    //   break;
    // case Algo.AStar:
    //   selectedAlgo = aStar;
    //   break;
    // case Algo.Greedy:
    //   selectedAlgo = greedy;
    //   break;
    // case Algo.Swarm:
    //   selectedAlgo = swarm;
    //   break;
  }

  const [startC, startR] = startPoi!.split("-");
  let path1: string[] = [];
  let path2: string[] = [];
  if (!selectedAlgo) return;
  if (isInjuredOnBoard()) {
    const [injuredC, injuredR] = isInjuredOnBoard()!.split("-");
    path1 = await selectedAlgo(
      parseInt(startC),
      parseInt(startR),
      [],
      isInjuredOnBoard()!,
      "visited"
    );
    path2 = await selectedAlgo(
      parseInt(injuredC),
      parseInt(injuredR),
      [],
      endPoi!,
      "visited2"
    );
  } else {
    path1 = await selectedAlgo(
      parseInt(startC),
      parseInt(startR),
      [],
      endPoi!,
      "visited"
    );
  }

  const finalPath = isInjuredOnBoard() ? [...path1, ...path2] : path1;

  showPath(finalPath);
}

async function dfs(
  c: number,
  r: number,
  path: string[] = [],
  endPoiCords: string,
  visitedClass: string
): Promise<string[]> {
  if (
    c < 0 ||
    c >= 25 ||
    r < 0 ||
    r >= 25 ||
    document.getElementById(`${c}-${r}`)?.classList?.contains("wall") ||
    document.getElementById(`${c}-${r}`)?.classList?.contains(visitedClass)
  ) {
    return [];
  }

  path.push(`${c}-${r}`);

  if (`${c}-${r}` === endPoiCords) {
    return path;
  } else if (document.getElementById(`${c}-${r}`)?.children.length === 0) {
    await new Promise((resolve) => setTimeout(resolve, 20));
    document.getElementById(`${c}-${r}`)?.classList?.add(visitedClass);
  }

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  for (let [dc, dr] of directions) {
    const newPath = await dfs(
      c + dc,
      r + dr,
      [...path],
      endPoiCords,
      visitedClass
    );
    if (newPath && newPath.length > 0) {
      return newPath;
    }
  }

  return [];
}
class bfsNode {
  cords: number[];
  path: string[];
  constructor(cords: number[], path: string[]) {
    this.cords = cords;
    this.path = path;
  }
}
async function bfs(
  c: number,
  r: number,
  path: string[] = [],
  endPoiCords: string,
  visitedClass: string
): Promise<string[]> {
  path;
  const q: bfsNode[] = [];
  q.push({ cords: [c, r], path: [`${c}-${r}`] });

  while (q.length > 0) {
    const { cords, path } = q.shift()!;
    const [c, r] = cords;
    if (
      c < 0 ||
      c >= 25 ||
      r < 0 ||
      r >= 25 ||
      document.getElementById(`${c}-${r}`)?.classList?.contains("wall") ||
      document.getElementById(`${c}-${r}`)?.classList?.contains(visitedClass)
    ) {
      continue;
    }
    if (`${c}-${r}` === endPoiCords) {
      return path;
    } else if (document.getElementById(`${c}-${r}`)?.children.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      document.getElementById(`${c}-${r}`)?.classList?.add(visitedClass);
    }
    const directions = [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];
    for (let [dc, dr] of directions) {
      q.push({
        cords: [c + dc, r + dr],
        path: [...path, `${c + dc}-${r + dr}`],
      });
    }
  }

  return [];
}
async function showPath(path: string[]) {
  for (let node of path) {
    if (document.getElementById(node)?.children.length !== 0) {
      document.getElementById(node)?.classList?.add("poi");
    }
    await new Promise((resolve) => setTimeout(resolve, 20));
    document.getElementById(node)?.classList?.add("path");
  }
}
function isInjuredOnBoard() {
  const interestContainer = document.getElementById("interest-container");
  const injuredElement = interestContainer?.querySelector("#injured");
  if (injuredElement === null) {
    return document.getElementById("injured")?.parentElement?.id;
  }
  return "";
}
