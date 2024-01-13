import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import TutorialContent from "./TutorialContent";
import TutorialFooter from "./TutorialFooter";
import { LocalStorageService } from "@/services/localStorageService";

const TutorialModal = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const neverShowAgain = LocalStorageService.getItem<boolean>("tutorial");

    if (neverShowAgain === true) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, []);

  const onPageNumberChange = (change: number) => {
    setPageNumber((prev) => prev + change);
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className=" w-80 sm:w-[450px] rounded ">
        <DialogHeader>
          <DialogTitle>Tutorial</DialogTitle>
          {pageNumber === 0 && (
            <DialogDescription>
              Feel free to skip the tutorial.
            </DialogDescription>
          )}
        </DialogHeader>
        <TutorialContent pageNumber={pageNumber}></TutorialContent>
        <DialogFooter className="flex w-full">
          <div className="w-full flex justify-between">
            <TutorialFooter
              handleFinish={() => setIsOpen(false)}
              pageNumber={pageNumber}
              onPageNumberChange={onPageNumberChange}
            ></TutorialFooter>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TutorialModal;
