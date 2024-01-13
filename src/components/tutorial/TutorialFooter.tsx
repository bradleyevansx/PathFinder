import { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { LocalStorageService } from "@/services/localStorageService";

interface Props {
  pageNumber: number;
  onPageNumberChange: (pageNumber: number) => void;
  handleFinish: () => void;
}

const TutorialFooter = ({
  onPageNumberChange,
  pageNumber,
  handleFinish,
}: Props) => {
  const [neverShowAgain, setNeverShowAgain] = useState(false);
  const setNewValue = (x: any) => {
    setNeverShowAgain(x);
  };
  const finish = () => {
    if (neverShowAgain === true) {
      LocalStorageService.setItem("tutorial", true);
    } else {
      LocalStorageService.setItem("tutorial", false);
    }
    handleFinish && handleFinish();
  };

  return (
    <div className="flex justify-between w-full">
      <div className="flex items-center gap-2 ">
        <Button type="submit" className="w-fit" onClick={finish}>
          Skip
        </Button>
        <div className=" gap-2 hidden sm:flex items-center">
          <Checkbox
            checked={neverShowAgain}
            onCheckedChange={setNewValue}
          ></Checkbox>
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-28">
            Dont show me this again.
          </label>
        </div>
      </div>
      <div className="flex gap-2">
        {pageNumber !== 0 && (
          <Button variant={"ghost"} onClick={() => onPageNumberChange(-1)}>
            Prev
          </Button>
        )}
        {pageNumber !== 5 && (
          <Button variant={"ghost"} onClick={() => onPageNumberChange(1)}>
            Next
          </Button>
        )}
        {pageNumber === 5 && (
          <Button variant={"ghost"} onClick={finish}>
            Finish
          </Button>
        )}
      </div>
    </div>
  );
};

export default TutorialFooter;
