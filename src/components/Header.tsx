import AlgoOptions from "./AlgoOptions";
import ColorModeSwitch from "./ColorModeSwitch";

const Header = () => {
  return (
    <header className="hidden h-16 md:flex justify-between items-center px-5 border-b border-gray-200  dark:border-neutral-800">
      <h1 className="text-lg font-bold m-0 w-fit">
        Path Finding Algorithm Visualizer
      </h1>
      <AlgoOptions></AlgoOptions>
      <ColorModeSwitch></ColorModeSwitch>
    </header>
  );
};

export default Header;
