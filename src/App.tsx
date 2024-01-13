import Grid from "./components/Grid";
import Header from "./components/Header";
import LeftSideContainer from "./components/LeftSideContainer";
import RightSideContainer from "./components/RightSideContainer";
import TutorialModal from "./components/tutorial/TutorialModal";
import { Card, CardContent, CardHeader } from "./components/ui/card";
import { Algo, AlgoProvider } from "./hooks/AlgoProvider";
import { ThemeProvider } from "./hooks/ThemeProvider";

function App() {
  return (
    <>
      <TutorialModal></TutorialModal>
      <div className="flex md:hidden justify-center items-center h-screen">
        <Card>
          <CardHeader>
            <h1 className="text-lg font-bold m-0 mx-auto w-fit">Warning</h1>
          </CardHeader>
          <CardContent>
            <p>This website is not optimized for mobile.</p>
          </CardContent>
        </Card>
      </div>
      <div className="hidden md:flex md:flex-col h-screen">
        <ThemeProvider defaultTheme="dark" storageKey="path-theme">
          <AlgoProvider defaultAlgo={Algo.DepthFirstSearch}>
            <Header></Header>
            <article className="w-fit h-fit my-auto mx-auto flex items-center gap-6">
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
