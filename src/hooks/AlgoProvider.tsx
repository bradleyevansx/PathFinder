import { MinHeap } from "@/code/minHeap";
import { createContext, useContext, useEffect, useState } from "react";
export enum Algo {
  DepthFirstSearch = "DepthFirstSearch",
  BreadthFirstSearch = "BreadthFirstSearch",
  Dijkstra = "Dijkstra",
  AStar = "AStar",
  Greedy = "Greedy",
  Swarm = "Swarm",
}

export enum Speed {
  VeryFast = "VeryFast",
  Fast = "Fast",
  Average = "Average",
  Slow = "Slow",
}

type AlgoProviderProps = {
  children: React.ReactNode;
  defaultAlgo?: Algo;
};

interface AlgoStats {
  length: number;
  duration: number;
  algo: Algo;
  isSuccess: boolean;
}

type AlgoProviderState = {
  clearPath: () => void;
  removeWalls: () => void;
  boardIsFresh: boolean;
  initBoard: () => void;
  speed: Speed;
  setSpeed: (speed: Speed) => void;
  runAlgo: () => void;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
  algo: Algo;
  setAlgo: (algo: Algo) => void;
  algoStats: AlgoStats | null;
};

const initialState: AlgoProviderState = {
  algoStats: null,
  clearPath: () => null,
  removeWalls: () => null,
  boardIsFresh: true,
  initBoard: () => null,
  speed: Speed.Fast,
  setSpeed: () => null,
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
  const [algoStats, setAlgoStats] = useState<AlgoStats | null>(null);
  const [boardIsFresh, setBoardIsFresh] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState<Speed>(Speed.Fast);
  const [algo, setAlgo] = useState<Algo>(Algo.DepthFirstSearch);

  const removeWalls = () => {
    const tdElements = document.querySelectorAll("td");
    tdElements.forEach((td) => {
      if (!td.classList.contains("aside-cell")) {
        td.className = "";
      }
    });
  };
  const clearPath = () => {
    const classes = ["visited", "visited2", "path", "path2"];
    classes.forEach((className) => {
      const elements = Array.from(document.getElementsByClassName(className));
      for (let i = 0; i < elements.length; i++) {
        let weight = false;
        if (elements[i].classList.contains("weight")) {
          weight = true;
        }
        if (elements[i].classList.contains("aside-cell")) {
          continue;
        }
        elements[i].className = weight ? "weight" : "";
      }
    });
  };
  const initializeBoard = () => {
    removeWalls();
    const tdElement = document.querySelector(
      `tr:nth-child(${20 + 1}) td:nth-child(${4 + 1})`
    );
    const tdElement2 = document.querySelector(
      `tr:nth-child(${4 + 1}) td:nth-child(${20 + 1})`
    );
    var start = document.getElementById("start");
    var end = document.getElementById("end");
    var injured = document.getElementById("injured");
    var poiContainer = document.getElementById("interest-container");
    if (tdElement && tdElement2 && start && end && injured && poiContainer) {
      tdElement.appendChild(start);
      tdElement2.appendChild(end);
      poiContainer.appendChild(injured);
    }
    setAlgoStats(null);
    setBoardIsFresh(true);
  };
  useEffect(() => {
    initializeBoard();
  }, []);

  async function search(algo: Algo, speed: Speed) {
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
      case Algo.Dijkstra:
        selectedAlgo = dijkstra;
        break;
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
    let selectedSpeed;
    switch (speed) {
      case Speed.VeryFast:
        selectedSpeed = 0;
        break;
      case Speed.Fast:
        selectedSpeed = 10;
        break;
      case Speed.Average:
        selectedSpeed = 15;
        break;
      case Speed.Slow:
        selectedSpeed = 20;
    }

    const [startC, startR] = startPoi!.split("-");
    let path1: string[] = [];
    let path2: string[] = [];
    if (!selectedAlgo) return;
    const start = performance.now();
    if (isInjuredOnBoard()) {
      const [injuredC, injuredR] = isInjuredOnBoard()!.split("-");
      path1 = await selectedAlgo(
        parseInt(startC),
        parseInt(startR),
        [],
        isInjuredOnBoard()!,
        "visited",
        selectedSpeed
      );
      if (path1.length > 0) {
        path2 = await selectedAlgo(
          parseInt(injuredC),
          parseInt(injuredR),
          [],
          endPoi!,
          "visited2",
          selectedSpeed
        );
      } else {
        path2 = [];
      }
    } else {
      path1 = await selectedAlgo(
        parseInt(startC),
        parseInt(startR),
        [],
        endPoi!,
        "visited",
        selectedSpeed
      );
    }

    const finalPath = isInjuredOnBoard() ? [...path1, ...path2] : path1;
    const end = performance.now();

    setAlgoStats({
      length: finalPath.length,
      duration: end - start,
      algo: algo,
      isSuccess: finalPath.length > 0 ? true : false,
    });

    await showPath(finalPath);
  }

  const value = {
    algoStats,
    clearPath: () => {
      clearPath();
      setBoardIsFresh(true);
    },
    removeWalls,
    boardIsFresh,
    initBoard: () => initializeBoard(),
    speed,
    setSpeed,
    runAlgo: async () => {
      setIsRunning(true);
      await search(algo, speed);
      setIsRunning(false);
      setBoardIsFresh(false);
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

export const useAlgo = () => {
  const context = useContext(AlgoProviderContext);

  if (context === undefined)
    throw new Error("useSelectedAlgo must be used within a AlgoProvider");

  return context;
};

async function dfs(
  c: number,
  r: number,
  path: string[] = [],
  endPoiCords: string,
  visitedClass: string,
  speed: number
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
    await new Promise((resolve) => setTimeout(resolve, speed));
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
      visitedClass,
      speed
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
  visitedClass: string,
  speed: number
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
      await new Promise((resolve) => setTimeout(resolve, speed));
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

async function dijkstra(
  c: number,
  r: number,
  path: [] = [],
  endPoiCords: string,
  visitedClass: string,
  speed: number
): Promise<string[]> {
  path;
  const adjList = generateAdjencencyList();
  const startNode = `${c}-${r}`;
  const q = new MinHeap();
  q.push([0, startNode]);
  const visited = new Set();
  const previous = new Map();

  while (!q.isEmpty()) {
    const current = q.pop();
    if (!current) {
      continue;
    }
    const [weight1, startNode1] = current;
    if (startNode1 === endPoiCords) {
      return reconstructPath(previous, startNode, endPoiCords);
    }
    if (visited.has(startNode1)) {
      continue;
    }

    visited.add(startNode1);
    const currentElement = document.getElementById(startNode1);
    await new Promise((resolve) => setTimeout(resolve, speed));
    if (startNode1 !== `${c}-${r}` && startNode1 !== endPoiCords) {
      currentElement?.classList.add(visitedClass);
    }

    const neighbors = adjList.get(startNode1);
    neighbors?.map((neighbor) => {
      const weight2 = neighbor[0];
      const startNode2 = neighbor[1];
      if (!visited.has(startNode2)) {
        q.push([weight1 + weight2, startNode2]);

        if (!previous.has(startNode2)) {
          previous.set(startNode2, startNode1);
        }
      }
    });
  }

  return [];
}

function reconstructPath(
  previous: Map<string, string>,
  start: string,
  end: string
): string[] {
  const path = [];
  let current = end;

  while (current !== start) {
    path.unshift(current);
    current = previous.get(current) || "";
  }

  path.unshift(start);
  return path;
}
async function showPath(path: string[]) {
  for (let node of path) {
    if (document.getElementById(node)?.children.length !== 0) {
      document.getElementById(node)?.classList?.add("poi");
    }
    if (document.getElementById(node)?.classList?.contains("path")) {
      document.getElementById(node)?.classList?.remove("path");
      document.getElementById(node)?.classList?.add("path2");
    }
    await new Promise((resolve) => setTimeout(resolve, 15));
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

export function generateAdjencencyList(): Map<string, []> {
  const adjList = new Map();
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 25; j++) {
      const tdElement = document.querySelector(
        `tr:nth-child(${i + 1}) td:nth-child(${j + 1})`
      );
      if (tdElement?.classList.contains("wall")) continue;
      const neighbors = [];
      const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];
      for (let [dr, dc] of directions) {
        if (i + dr < 0 || i + dr >= 25 || j + dc < 0 || j + dc >= 25) continue;
        const neighbor = document.querySelector(
          `tr:nth-child(${i + 1 + dr}) td:nth-child(${j + 1 + dc})`
        );
        const weight = neighbor?.classList.contains("weight") ? 15 : 1;
        if (neighbor?.classList.contains("wall")) continue;
        neighbors.push([weight, `${i + dr}-${j + dc}`]);
      }
      adjList.set(`${i}-${j}`, neighbors);
    }
  }
  return adjList;
}
