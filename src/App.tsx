import Grid from "./components/Grid";
import Header from "./components/Header";
import LeftSideContainer from "./components/LeftSideContainer";
import MobileHeader from "./components/MobileHeader";
import RightSideContainer from "./components/RightSideContainer";
import TutorialModal from "./components/tutorial/TutorialModal";
import { Algo, AlgoProvider } from "./hooks/AlgoProvider";
import { ThemeProvider } from "./hooks/ThemeProvider";

function App() {
  return (
    <>
      <TutorialModal></TutorialModal>

      <div className="flex flex-col h-screen justify-center items-center gap-4 md:justify-between">
        <ThemeProvider defaultTheme="dark" storageKey="path-theme">
          <AlgoProvider defaultAlgo={Algo.DepthFirstSearch}>
            <Header></Header>
            <MobileHeader></MobileHeader>
            <article className="w-fit h-fit flex items-center gap-6 md:m-auto">
              <LeftSideContainer></LeftSideContainer>
              <Grid></Grid>
              <RightSideContainer></RightSideContainer>
            </article>
          </AlgoProvider>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
