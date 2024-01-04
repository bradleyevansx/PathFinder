import { Card, CardContent } from "./ui/card";
import StartAlgoButton from "./StartAlgoButton";
import { VscDebugStart } from "react-icons/vsc";
import { FaHospital, FaUserInjured } from "react-icons/fa";
import { useTheme } from "../hooks/ThemeProvider";
import ClearBoardButton from "./ClearBoardButton";

const SideContainer = () => {
  const { theme } = useTheme();
  return (
    <Card className=" w-72 h-fit">
      <CardContent className="mt-6 flex flex-col items-center">
        <ul className="flex flex-col items-center space-y-3">
          <li className="flex items-center space-x-2">
            <VscDebugStart size={"36px"}></VscDebugStart>
            <p className=" font-semibold text-xl">Start Point</p>
          </li>
          <li className="flex items-center space-x-2">
            <FaHospital size={"36px"}></FaHospital>
            <p className="font-semibold text-xl">End Point</p>
          </li>
          <li className="flex items-center space-x-2">
            <FaUserInjured size={"36px"}></FaUserInjured>
            <p className="font-semibold text-xl">Patient</p>
          </li>
          <li className="flex items-center space-x-2">
            <table className={`custom-table ${theme}`}>
              <tbody>
                <tr>
                  <td className="wall">
                    <div></div>
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="font-semibold text-xl">Wall</p>
          </li>
          <li className="flex items-center space-x-2">
            <table className={`custom-table ${theme}`}>
              <tbody>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <p className="font-semibold text-xl">Univisited Node</p>
          </li>
          <li className="flex items-center space-x-2">
            <table className={`custom-table ${theme}`}>
              <tbody>
                <tr>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <p className="font-semibold text-xl">Visited Node</p>
          </li>
          <li className="flex items-center space-x-2">
            <ClearBoardButton></ClearBoardButton>
            <StartAlgoButton></StartAlgoButton>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};

export default SideContainer;
