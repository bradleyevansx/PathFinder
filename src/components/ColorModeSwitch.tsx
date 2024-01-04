import { useTheme } from "../hooks/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

const ColorModeSwitch = () => {
  const { setTheme, theme } = useTheme();

  const handleToggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <div className="flex items-center space-x-2">
      <Button variant={"ghost"} onClick={handleToggleTheme}>
        {theme === "light" ? <Sun></Sun> : <Moon></Moon>}
      </Button>
    </div>
  );
};

export default ColorModeSwitch;
