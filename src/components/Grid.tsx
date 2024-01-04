import { useEffect, useState } from "react";
import { VscDebugStart } from "react-icons/vsc";
import { FaHospital, FaUserInjured } from "react-icons/fa";
import "./Grid.css";
import { Card, CardContent } from "./ui/card";
import { useSelectedAlgo } from "@/hooks/AlgoProvider";

const Grid = () => {
  const { isRunning } = useSelectedAlgo();
  const [isMoving, setIsMoving] = useState(false);
  const tableData = Array.from({ length: 25 }, () => Array(25).fill(""));
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [currSpanId, setCurrSpanId] = useState("");

  const handleMouseDownInTable = () => {
    if (isRunning) return;
    setIsMouseDown(true);
  };

  const handleMouseUpInTable = () => {
    if (isRunning) return;
    setIsMouseDown(false);
  };

  const handleMouseOverCell = (rowIndex: number, cellIndex: number) => {
    if (isRunning) return;
    if (isMouseDown) {
      const tdElement = document.querySelector(
        `tr:nth-child(${rowIndex + 1}) td:nth-child(${cellIndex + 1})`
      );
      if (tdElement && !tdElement.querySelector("span")) {
        tdElement.classList.toggle("wall");
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
    if (isRunning) return;
    event.preventDefault();
    const tdElement = document.querySelector(
      `tr:nth-child(${rowIndex + 1}) td:nth-child(${cellIndex + 1})`
    );
    if (tdElement && !tdElement.querySelector("span")) {
      tdElement.classList.toggle("wall");
    }
  };

  const handleMouseDownPoi = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (isRunning) return;
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
    if (isRunning) return;
    const spanElement = event.currentTarget;
    const parent = spanElement.parentElement;
    const container = document.getElementById("interest-container");
    if (parent && container) {
      parent.removeChild(spanElement);
      container.appendChild(spanElement);
    }
  };
  const handleMouseUpPoiOpaque = () => {
    if (isRunning) return;
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

  useEffect(() => {
    const tdElement = document.querySelector(
      `tr:nth-child(${20 + 1}) td:nth-child(${4 + 1})`
    );
    const tdElement2 = document.querySelector(
      `tr:nth-child(${4 + 1}) td:nth-child(${20 + 1})`
    );
    var start = document.getElementById("start");
    var end = document.getElementById("end");

    if (tdElement && tdElement2 && start && end) {
      tdElement.appendChild(start);
      tdElement2.appendChild(end);
    }
  }, []);

  return (
    <>
      <div id="interest-container" style={{ display: "none" }}>
        <span
          onMouseUp={handleMouseUpInTable}
          onMouseDown={handleMouseDownPoi}
          id="injured"
          style={{
            display: "flex",
            margin: "auto",
            width: "100%",
            height: "100%",
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
          style={{
            display: "flex",
            margin: "auto",
            width: "100%",
            height: "100%",
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
          style={{
            opacity: ".5",
            display: "flex",
            margin: "auto",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <VscDebugStart></VscDebugStart>
        </span>
        <span
          onMouseUp={handleMouseUpInTable}
          onMouseDown={handleMouseDownPoi}
          id="start"
          style={{
            display: "flex",
            margin: "auto",
            width: "100%",
            height: "100%",
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
          style={{
            display: "flex",
            margin: "auto",
            width: "100%",
            height: "100%",
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
          style={{
            opacity: ".5",
            display: "flex",
            margin: "auto",
            width: "100%",
            height: "100%",
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
