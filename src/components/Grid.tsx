import { useEffect, useState } from "react";
import { VscDebugStart } from "react-icons/vsc";
import { FaHospital, FaUserInjured } from "react-icons/fa";
import "./Grid.css";
import { Card, CardContent } from "./ui/card";
import { useAlgo } from "@/hooks/AlgoProvider";

const Grid = () => {
  const { isRunning, boardIsFresh } = useAlgo();
  const [isWKeyPressed, setIsWKeyPressed] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const tableData = Array.from({ length: 25 }, () => Array(25).fill(""));
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [currSpanId, setCurrSpanId] = useState("");
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "w") {
        setIsWKeyPressed(true);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "w") {
        setIsWKeyPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  const handleMouseDownInTable = () => {
    if (isRunning || !boardIsFresh) return;
    setIsMouseDown(true);
  };

  const handleMouseUpInTable = () => {
    if (isRunning || !boardIsFresh) return;
    setIsMouseDown(false);
  };

  const handleMouseOverCell = (rowIndex: number, cellIndex: number) => {
    if (isRunning || !boardIsFresh) return;
    if (isMouseDown) {
      const tdElement = document.querySelector(
        `tr:nth-child(${rowIndex + 1}) td:nth-child(${cellIndex + 1})`
      );
      if (tdElement && !tdElement.querySelector("span")) {
        handleToggleWallAndWeight(tdElement);
      }
    }
    if (isMoving) {
      const tdElement = document.querySelector(
        `tr:nth-child(${rowIndex + 1}) td:nth-child(${cellIndex + 1})`
      );
      const spanElement = document.getElementById(currSpanId);
      if (tdElement && !tdElement.querySelector("span") && spanElement) {
        tdElement.appendChild(spanElement);
      }
    }
  };

  const handleMouseDownInCell = (
    event: React.MouseEvent<HTMLTableDataCellElement, MouseEvent>,
    rowIndex: number,
    cellIndex: number
  ) => {
    if (isRunning || !boardIsFresh) return;
    event.preventDefault();
    const tdElement = document.querySelector(
      `tr:nth-child(${rowIndex + 1}) td:nth-child(${cellIndex + 1})`
    );
    if (tdElement?.querySelector("span")) return;
    if (tdElement) {
      handleToggleWallAndWeight(tdElement);
    }
  };

  const handleToggleWallAndWeight = (element: Element) => {
    const isWall = element.classList.contains("wall");
    const isWeight = element.classList.contains("weight");

    if (isWall) {
      if (isWKeyPressed) {
        element.classList.remove("wall");
        element.classList.add("weight");
        return;
      } else {
        element.classList.remove("wall");
        return;
      }
    }
    if (isWeight) {
      if (isWKeyPressed) {
        element.classList.remove("weight");
        return;
      } else {
        element.classList.remove("weight");
        element.classList.add("wall");
        return;
      }
    }
    if (isWKeyPressed) {
      element.classList.add("weight");
    } else {
      element.classList.add("wall");
    }
  };

  const handleMouseDownPoi = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (isRunning || !boardIsFresh) return;
    const spanElement = event.currentTarget;
    const parent = spanElement.parentElement;
    const container = document.getElementById("interest-container");
    const id = spanElement.id + "-opaque";
    const spanElementOpaque = document.getElementById(id);
    if (parent && container && spanElementOpaque) {
      parent.removeChild(spanElement);
      container.appendChild(spanElement);
      parent.appendChild(spanElementOpaque);
      setIsMoving(true);
      setCurrSpanId(spanElementOpaque.id);
    }
  };
  const handleMouseLeavePoiOpaque = (
    event: React.MouseEvent<HTMLSpanElement>
  ) => {
    if (isRunning || !boardIsFresh) return;
    const spanElement = event.currentTarget;
    const parent = spanElement.parentElement;
    const container = document.getElementById("interest-container");
    if (parent && container) {
      parent.removeChild(spanElement);
      container.appendChild(spanElement);
    }
  };
  const handleMouseUpPoiOpaque = () => {
    if (isRunning || !boardIsFresh) return;
    if (isMoving) {
      const spanElementOpaque = document.getElementById(currSpanId);
      const tdElement = spanElementOpaque?.parentElement;
      const spanElementId = currSpanId.replace("-opaque", "");
      const spanElement = document.getElementById(spanElementId);
      const container = document.getElementById("interest-container");

      if (container && tdElement && spanElement && spanElementOpaque) {
        container.appendChild(spanElementOpaque);
        tdElement.appendChild(spanElement);
        tdElement.classList.remove("wall");
        setCurrSpanId("");
        setIsMoving(false);
      }
    }
  };

  return (
    <>
      <div id="interest-container" style={{ display: "none" }}>
        <span
          onMouseUp={handleMouseUpInTable}
          onMouseDown={handleMouseDownPoi}
          id="injured"
          className={"w-[9px] h-[9px] md:h-[100%] md:w-[100%]"}
          style={{
            display: "flex",
            margin: "auto",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaUserInjured></FaUserInjured>
        </span>
        <span
          onMouseUp={handleMouseUpPoiOpaque}
          onMouseLeave={handleMouseLeavePoiOpaque}
          id="injured-opaque"
          className={"w-[9px] h-[9px] md:h-[100%] md:w-[100%]"}
          style={{
            display: "flex",
            margin: "auto",

            justifyContent: "center",
            alignItems: "center",
            opacity: 0.5,
          }}
        >
          <FaUserInjured></FaUserInjured>
        </span>
        <span
          onMouseUp={handleMouseUpPoiOpaque}
          onMouseLeave={handleMouseLeavePoiOpaque}
          id="start-opaque"
          className={"w-[9px] h-[9px] md:h-[100%] md:w-[100%]"}
          style={{
            opacity: ".5",
            display: "flex",
            margin: "auto",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <VscDebugStart></VscDebugStart>
        </span>
        <span
          onMouseUp={handleMouseUpInTable}
          onMouseDown={handleMouseDownPoi}
          className={"w-[9px] h-[9px] md:h-[100%] md:w-[100%]"}
          id="start"
          style={{
            display: "flex",
            margin: "auto",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <VscDebugStart></VscDebugStart>
        </span>
        <span
          onMouseUp={handleMouseUpInTable}
          onMouseDown={handleMouseDownPoi}
          id="end"
          className={"w-[9px] h-[9px] md:h-[100%] md:w-[100%]"}
          style={{
            display: "flex",
            margin: "auto",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaHospital></FaHospital>
        </span>
        <span
          onMouseUp={handleMouseUpPoiOpaque}
          onMouseLeave={handleMouseLeavePoiOpaque}
          id="end-opaque"
          className={"w-[9px] h-[9px] md:h-[100%] md:w-[100%]"}
          style={{
            opacity: ".5",
            display: "flex",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaHospital></FaHospital>
        </span>
      </div>
      <Card>
        <CardContent className="mt-6 ">
          <table
            className={`custom-table light`}
            onMouseDown={handleMouseDownInTable}
            draggable="false"
            onMouseUp={handleMouseUpInTable}
          >
            <tbody>
              {tableData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      id={`${rowIndex}-${cellIndex}`}
                      key={cellIndex}
                      className={cell}
                      onMouseOver={() =>
                        handleMouseOverCell(rowIndex, cellIndex)
                      }
                      onMouseDown={(e) =>
                        handleMouseDownInCell(e, rowIndex, cellIndex)
                      }
                    ></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </>
  );
};

export default Grid;
