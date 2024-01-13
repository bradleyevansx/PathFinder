import { Github } from "lucide-react";
import { Button } from "../ui/button";
import algoSelect from "../../assets/tutorial/algoSelect.png";
import addPatient from "../../assets/tutorial/addPatient.png";
import wallsAndWeights from "../../assets/tutorial/wallsAndWeights.mp4";
import { useEffect, useState } from "react";

interface Props {
  pageNumber: number;
}

const TutorialContent = ({ pageNumber }: Props) => {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const preloadAssets = async () => {
      const imagePromises = [algoSelect, addPatient].map((src) => {
        const img = new Image();
        img.src = src;
        return new Promise((resolve) => {
          img.onload = resolve;
        });
      });

      const video = document.getElementById(
        "tutorialVideo"
      ) as HTMLVideoElement | null;
      const videoPromise = video
        ? new Promise((resolve) => {
            video.onloadeddata = resolve;
          })
        : Promise.resolve();

      await Promise.all([...imagePromises, videoPromise]);
      setAssetsLoaded(true);
    };

    preloadAssets();
  }, [pageNumber]);

  if (!assetsLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div style={{ display: pageNumber === 0 ? "block" : "none" }}>
        <p className="text-xs">
          A pathfinding algorithm is a method used in computer science and
          related fields to find the shortest route between two points in a
          graph or grid. It's crucial for optimizing movement in applications
          like maps, video games, and robotics.
        </p>
      </div>
      <div style={{ display: pageNumber === 1 ? "block" : "none" }}>
        <p className="text-xs mb-4">Select an algorithm from the dropdown:</p>
        <img loading="eager" className="w-2/4 mx-auto mb-4" src={algoSelect} />
        <p className="text-xs">
          Not all algorithms are created equally. Some algorithms guarantee the
          shortest path, while others do not. Some also take things like the
          weight of certain cells into account, while others do not.
        </p>
      </div>
      <div
        style={{ display: pageNumber === 2 ? "block" : "none" }}
        className="space-y-3"
      >
        <p className="text-sm">Available Algorithms:</p>
        <div className="flex flex-col">
          <p className="text-xs font-bold">Depth First Search:</p>
          <p className="text-xs">
            Does not guarantee the shortest path or take weights into account.
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-bold">Breadth First Search:</p>
          <p className="text-xs">
            Guarantees the shortest path but does not take weights into account.
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-bold">Dijkstra's Algorithm:</p>
          <p className="text-xs">
            Guarantees the shortest path and considers weights.
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-bold">A* Algorithm:</p>
          <p className="text-xs">
            Guarantees the shortest path and incorporates heuristic functions.
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-bold">Greedy Algorithm:</p>
          <p className="text-xs">
            Prioritizes the most promising path without considering future
            steps.
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-bold">Swarm Algorithm:</p>
          <p className="text-xs">
            Utilizes swarm intelligence principles for pathfinding.
          </p>
        </div>
      </div>
      <div style={{ display: pageNumber === 3 ? "block" : "none" }}>
        <video
          id="tutorialVideo"
          loop={true}
          autoPlay={true}
          src={wallsAndWeights}
          playsInline={true}
          controls={false}
        ></video>
        <div className="flex flex-col gap-3 my-3">
          <p className="text-xs">
            Move around points of interest by clicking and dragging
          </p>
          <p className="text-xs">Click and drag on empty cells to add walls</p>
          <p className="text-xs">
            Click and drag on empty cells while holding W to add weights
          </p>
        </div>
        <p className="font-bold text-sm ">Weight Values:</p>
        <div className="flex gap-3">
          <div className="flex">
            <p className="text-sm">Weight Cells:</p>
            <p className="text-sm">15</p>
          </div>
          <div className="flex">
            <p className="text-sm">Empty Cells:</p>
            <p className="text-sm">1</p>
          </div>
        </div>
      </div>
      <div
        style={{ display: pageNumber === 4 ? "block" : "none" }}
        className="space-y-3"
      >
        <p className="text-sm font-bold">
          Add a patient by clicking Add Patient
        </p>
        <p className="text-sm">
          This will add a stop for the ambulance on the way to the hospital. Now
          the algorithm will find its way to the patient and then the hospital.
        </p>
        <img loading="eager" className="w-2/4 mx-auto mb-4" src={addPatient} />
      </div>
      <div
        style={{ display: pageNumber === 5 ? "block" : "none" }}
        className="space-y-3"
      >
        <p>
          Finally just interact with the grid through the Start, Maze, Clear,
          Clear Path and Speed Select!
        </p>
        <p>The code for this project can be found on my github.</p>
        <a
          className="w-full"
          target="_blank"
          href="https://github.com/bradleyevansx/PathFinder.git"
        >
          <Button className="w-full" variant={"outline"}>
            <Github></Github>
          </Button>
        </a>
      </div>
    </>
  );
};

export default TutorialContent;
