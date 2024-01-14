import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import AlgoSelect from "./AlgoSelect";
import SpeedSelect from "./SpeedSelect";
import GenerateWeights from "./GenerateWeights";
import { useAlgo } from "@/hooks/AlgoProvider";
import AlgoDesc from "./AlgoDesc";

const SelectsModal = () => {
  const { algo } = useAlgo();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant={"outline"}>Config</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Alorithm Config</DrawerTitle>
          <DrawerDescription>Select the algoithm, speed </DrawerDescription>
        </DrawerHeader>
        <div className="flex justify-center gap-3 px-4">
          <AlgoSelect></AlgoSelect>
          <SpeedSelect></SpeedSelect>
          <GenerateWeights></GenerateWeights>
        </div>
        {/*algo explanation here */}
        <DrawerFooter>
          <AlgoDesc algo={algo}></AlgoDesc>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SelectsModal;
