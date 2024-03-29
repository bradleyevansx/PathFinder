import { useAlgo } from "@/hooks/AlgoProvider";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const MazeSelect = () => {
  const { removeWalls, setIsRunning, boardIsFresh, isRunning } = useAlgo();

  const handleMaze = async () => {
    await setIsRunning(true);
    removeWalls();
    kruskalMaze();
    await setIsRunning(false);
  };
  return (
    <TooltipProvider delayDuration={10}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={"outline"}
            disabled={isRunning || !boardIsFresh}
            onClick={handleMaze}
          >
            Maze
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="w-52">
            This generates a maze using Kruskal's maze generation algorithm.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MazeSelect;

const kruskalMaze = async () => {
  for (let row = 0; row < 25; row++) {
    for (let col = 0; col < 25; col++) {
      const cell = document.getElementById(`${col}-${row}`);

      if ((row % 2 !== 0 || col % 2 !== 0) && cell?.children.length === 0) {
        cell?.classList.add("wall");
      }
    }
  }

  let idCounter = 0;

  for (let row = 0; row < 25; row++) {
    for (let col = 0; col < 25; col++) {
      const cell = document.getElementById(`${col}-${row}`);

      if (cell && !cell.classList.contains("wall")) {
        cell.classList.add(`cell-${idCounter}`);
        idCounter++;
      }
    }
  }

  const wallCells = [];

  for (let row = 0; row < 25; row++) {
    for (let col = 0; col < 25; col++) {
      const cell = document.getElementById(`${col}-${row}`);

      if (cell && cell.classList.contains("wall")) {
        const topCell =
          row > 0 ? document.getElementById(`${col}-${row - 1}`) : null;
        const bottomCell =
          row < 24 ? document.getElementById(`${col}-${row + 1}`) : null;
        const leftCell =
          col > 0 ? document.getElementById(`${col - 1}-${row}`) : null;
        const rightCell =
          col < 24 ? document.getElementById(`${col + 1}-${row}`) : null;

        const isHorizontalWall =
          (!topCell || topCell?.classList.contains("wall")) &&
          (!bottomCell || bottomCell?.classList.contains("wall")) &&
          (!rightCell || !rightCell?.classList.contains("wall")) &&
          (!leftCell || !leftCell?.classList.contains("wall"));
        const isVerticalWall =
          (!leftCell || leftCell?.classList.contains("wall")) &&
          (!rightCell || rightCell?.classList.contains("wall")) &&
          (!topCell || !topCell?.classList.contains("wall")) &&
          (!bottomCell || !bottomCell?.classList.contains("wall"));

        if (isVerticalWall || isHorizontalWall) {
          wallCells.push([cell, isVerticalWall]);
        }
      }
    }
  }

  for (let i = wallCells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [wallCells[i], wallCells[j]] = [wallCells[j], wallCells[i]];
  }

  for (let [cell, isVerticalWall] of wallCells) {
    const cords = (cell as HTMLElement).id.split("-");
    const row = parseInt(cords[0]);
    const col = parseInt(cords[1]);

    if (isVerticalWall) {
      const leftCell = document.getElementById(`${row}-${col - 1}`);
      const rightCell = document.getElementById(`${row}-${col + 1}`);
      if (
        leftCell &&
        rightCell &&
        leftCell.classList &&
        rightCell.classList &&
        leftCell?.classList[0] !== rightCell?.classList[0]
      ) {
        await new Promise((resolve) => setTimeout(resolve, 25));
        (cell as HTMLElement).classList.remove("wall");
        const needsUpdatedClass = Array.from(
          document.getElementsByClassName(leftCell.classList[0])
        );

        for (let needsUpdate of needsUpdatedClass) {
          const curr = needsUpdate as HTMLElement;
          for (let i = curr.classList.length - 1; i >= 0; i--) {
            curr.classList.remove(curr.classList[i]);
          }
          curr.classList.add(rightCell.classList[0]);
        }
      }
    } else {
      const topCell = document.getElementById(`${row - 1}-${col}`);
      const bottomCell = document.getElementById(`${row + 1}-${col}`);
      if (
        topCell &&
        bottomCell &&
        topCell.classList &&
        bottomCell.classList &&
        topCell?.classList[0] !== bottomCell?.classList[0]
      ) {
        await new Promise((resolve) => setTimeout(resolve, 25));
        (cell as HTMLElement).classList.remove("wall");
        const needsUpdatedClass = Array.from(
          document.getElementsByClassName(topCell.classList[0])
        );

        for (let needsUpdate of needsUpdatedClass) {
          const curr = needsUpdate as HTMLElement;

          for (let i = curr.classList.length - 1; i >= 0; i--) {
            curr.classList.remove(curr.classList[i]);
          }
          curr.classList.add(bottomCell.classList[0]);
        }
      }
    }
  }
  const pois = ["injured", "start", "end"];
  for (let poi of pois) {
    const poiElement = document.getElementById(poi);
    if (poiElement) {
      const cords = poiElement.parentElement?.id.split("-");
      if (!cords) continue;
      const col = parseInt(cords[0]);
      const row = parseInt(cords[1]);

      if (col % 2 !== 0 && row % 2 !== 0) {
        document.getElementById(`${col - 1}-${row}`)?.classList.remove("wall");
        document.getElementById(`${col + 1}-${row}`)?.classList.remove("wall");
        document.getElementById(`${col}-${row - 1}`)?.classList.remove("wall");
        document.getElementById(`${col}-${row + 1}`)?.classList.remove("wall");
      }
    }
  }
};
